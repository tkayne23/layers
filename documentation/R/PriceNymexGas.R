
library("rvest")
library("Quandl")
library("dplyr")
library("lubridate")
library("xts")

left = function (string,char){
  substr(string,1,char)
}

right = function (string, char){
  substr(string,nchar(string)-(char-1),nchar(string))
}


url <- "http://quotes.ino.com/exchanges/contracts.html?r=NYMEX_HP"

nymexFutures <- url %>%
  read_html() %>%
  html_nodes(xpath='//*[@id="col-main"]/div[2]/table') %>%
  html_table()
nymexFutures <- nymexFutures[[1]]

nymexFutures <- tail(nymexFutures,-2)

colnames(nymexFutures)[1] <- "Market"
colnames(nymexFutures)[2] <- "Contract"
colnames(nymexFutures)[3] <- "Open"
colnames(nymexFutures)[4] <- "High"
colnames(nymexFutures)[5] <- "Low"
colnames(nymexFutures)[6] <- "Last"
colnames(nymexFutures)[7] <- "Change"
colnames(nymexFutures)[8] <- "Pct"
colnames(nymexFutures)[9] <- "Time"

nymexFutures <- nymexFutures[left(nymexFutures$Market,10) != "All quotes" ,]

nymexFutures <- nymexFutures[right(nymexFutures$Market,2) != ".E" ,]

nymex <- data.frame(
  month=as.POSIXct(paste("01 ",nymexFutures$Contract),format="%d %b %Y")
  ,nymexGasFuturePrice=nymexFutures$Last
)

nymexHistory <- Quandl("CHRIS/CME_NG1", api_key="", collapse="monthly", start_date="1999-01-01")



nymex <- 
  
  merge(
    data.frame(
      month=floor_date(as.Date(nymexHistory$Date),"month")
      ,nymexCrudeHistory=as.numeric(nymexHistory$Last)
    )
    ,data.frame(
      month=as.Date(paste("01 ",nymexFutures$Contract),format="%d %b %Y")
      ,nymexCrudeFuture=as.numeric(nymexFutures$Last)
    )
    ,by="month"
    ,all=TRUE
    
  )  

nymex <- data.frame(
  month=nymex$month
  ,nymexGasPrice=coalesce(nymex$nymexCrudeHistory,nymex$nymexCrudeFuture)
)

alldates <- data.frame(
  month=seq.Date(min(nymex$month), max(nymex$month), by="month")
)

nymex<-merge(nymex, alldates, by="month", all=TRUE)

nymex<-na.locf(nymex)

nymex<-data.frame(
  month=as.Date(nymex$month)
  ,nymexGasPrice=as.numeric(nymex$nymexGasPrice)
)

futuresEndMonth<-nymex$month[NROW(nymex)]
futuresEndMonthPrice<-as.numeric(nymex$nymexGasPrice[NROW(nymex)])


additionalFuturesMonth<-seq(futuresEndMonth %m+% months(1),by = "month", length.out =120)
additionalFuturesPrice<-rep(futuresEndMonthPrice,120)

nymex <- 
  bind_rows(
    nymex
    ,data.frame(
      month=additionalFuturesMonth
      ,nymexGasPrice=additionalFuturesPrice
    )
  )

library(RPostgreSQL)
drv <- dbDriver("PostgreSQL")
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="layers"
                  , host="localhost"
                  , port = 25432)
dbWriteTable(conn, c("stage", "strip_price_gas"), nymex, overwrite=TRUE, schema="stage",row.names = FALSE)

dbDisconnect(conn)

plot(nymex$nymexGasPrice~nymex$month,type="o", col="blue")
