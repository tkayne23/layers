

library(RPostgreSQL)
library(aRpsDCA)
library(dplyr)
library(lubridate)


id_well_formation <- as.character('dfb1377f-4be6-44b6-b370-204f5e66e937')

drv <- dbDriver("PostgreSQL") 
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="layers"
                  , host="localhost"
                  , port = 25432)
sql.str = paste("SELECT * FROM f_oil_forecast_input('",id_well_formation,"')",sep="")

df <- dbGetQuery(conn, sql.str)

sql.str <- "SELECT date,nymex_oil FROM strip_price"

nymex <- dbGetQuery(conn, sql.str)

dbDisconnect(conn)

input.t <- df[,4] #months_on_oil
input.q <- df[,6] #oil_actuals_3mo_sma
changeInSlopeSeq <- df[,8] #changeinslope


forecast <- data.frame(
  prodMonth=input.t
  ,forecast=as.numeric(NA)
  ,pass=as.numeric(NA)
)

colnames(forecast)[1] <- "prodMonth"
colnames(forecast)[2] <- "forecast"
colnames(forecast)[3] <- "pass"



fitByPass <- data.frame(
  pass=as.numeric(character())
  ,qi=as.numeric(character())
  ,Di=as.numeric(character())
  #,b=as.numeric(character())
)


for (i in changeInSlopeSeq){
  if (i != 0) {
    
    u0 = i
    u = u0:length(input.t)
    
    #print(length(u))
    if (length(u) >= 3) {
      input.t2 <- input.t[u]
      input.q2 <- input.q[u]
      
      fit <- best.fit(input.q2,input.t2)
      #fit <- best.hyp2exp(input.q2,input.t2)
      
      
      forecastTemp <- data.frame(
        input.t2
        ,arps.q(fit$decline,input.t2)
        ,i
      )
      colnames(forecastTemp)[1] <- "prodMonth"
      colnames(forecastTemp)[2] <- "forecast"
      colnames(forecastTemp)[3] <- "pass"
      
      forecast <- 
        bind_rows(
          forecast
          ,forecastTemp
        )
      
      
      fitPassTemp <- 
        data.frame(
          pass=as.numeric(i)
          ,qi=as.numeric(fit[[1]][[1]])
          ,Di=as.numeric(fit[[1]][[2]])
          #,b=as.numeric(fit[[1]][[3]])
        )
      
      fitByPass <-
        bind_rows(
          fitByPass
          ,fitPassTemp
        )
      
    }#end if stmt
    
  }#end if stmt
  
}#end for loop


#at least one decline was run
if (nrow(fitByPass)>0) {
  

    
    u = u0:(length(input.t) + 90)
    
    forecastTemp <- data.frame(
      u
      ,arps.q(fit$decline,u)
      ,i
    )
    colnames(forecastTemp)[1] <- "prodMonth"
    colnames(forecastTemp)[2] <- "forecast"
    colnames(forecastTemp)[3] <- "pass"
    
    forecast <- 
      bind_rows(
        forecast
        ,forecastTemp
      )
    
    
    
    #latest forecast for dup prodMonth
    forecastFinal <- (forecast[!rev(duplicated(rev(forecast$prodMonth))),])
    
    
    #replace 0 with NA
    forecastFinal <- forecastFinal %>% mutate(forecast = ifelse(forecast==0,NA,forecast))
    
    
    #extract final decline attributes
    #fit.qi<-fit[[1]][[1]]
    #fit.Di<-fit[[1]][[2]]
    #fit.b<-fit[[1]][[3]]
    
    
    
    
    dfOutput <-
      merge(
        data.frame(
          months_on_oil=as.integer(df$months_on_oil)
          ,oil_actuals=as.numeric(df$oil_actuals)
        )
        ,data.frame(
          months_on_oil=as.integer(forecastFinal$prodMonth)
          ,oil_forecast=format(as.numeric(forecastFinal$forecast), scientific=FALSE)
          ,date=as.Date(min(df$date)) + months(forecastFinal$prodMonth)
        )
        ,by="months_on_oil"
        ,all=TRUE
      )
    
    dfOutput <- 
      merge(
        dfOutput
        ,data.frame(
          date=as.Date(nymex$date)
          ,nymex_oil=as.numeric(nymex$nymex_oil)
        )
        ,by="date"
        ,all.x=TRUE
      )
    
    dfOutput$date=as.character(dfOutput$date)
    dfOutput$id_well_formation=as.character(head(df$id_well_formation,1))
}