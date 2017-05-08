library(RPostgreSQL)
library(aRpsDCA)
library(dplyr)

drv <- dbDriver("PostgreSQL") 
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="COGCC"
                  , host="localhost"
                  , port = 25432)

sql.str = "
SELECT sq.*, CASE WHEN LAG(COALESCE(slope,0)) OVER (ORDER BY monthson) >= 0 and coalesce(slope,0) < 0 THEN monthson ELSE 0 END as changeInSlope 
FROM (
SELECT sq.*, lead(gas) OVER (ORDER BY monthson)-gas as slope
FROM (
SELECT prodMonth as monthson, coalesce(avg(gasactuals),0) as gas, count(distinct api) as wellcount 
from \"public\".\"cogcc_decline_gas\" 
where prodMonth <= 60
group by prodmonth 
) sq
) sq
"

data <- dbGetQuery(conn, sql.str)



fit <- best.fit(data$gas,data$monthson)



input.t <- data[,1] #monthson
input.q <- data[,2] #gas
changeInSlopeSeq <- data[,5]



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


changeInSlopeGrtr0 <- data[data['changeinslope'] > 0]

if (changeInSlopeGrtr0[1] > 0) {
  i = changeInSlopeGrtr0[1]
} else {
  i = 0 
}



   
      u0 = i+1 #0 based to 1 based
      u = u0:length(input.t)  
      
      #print(length(u))
      if (length(u) >= 3) {
        input.t2 <- input.t[u]
        input.q2 <- input.q[u]
        
        fit <- best.fit(input.q2,input.t2)
        
        
        
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
      }
        
   



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
forecastFinal <- forecast[!rev(duplicated(rev(forecast$prodMonth))),]


#replace 0 with NA
forecastFinal <- forecastFinal %>% mutate(forecast = ifelse(forecast==0,NA,forecast))


arps.eur(arps.decline(fit[[1]][[1]],fit[[1]][[2]],fit[[1]][[3]]),10)


dfOutput <-
  merge(
    data.frame(
      month=as.integer(data$monthson)
      ,gasActuals=as.numeric(data$gas)
    )
    ,data.frame(
      month=as.integer(forecastFinal$prodMonth)
      ,gasForecast=as.numeric(forecastFinal$forecast)
    )
    ,by="month"
    ,all=TRUE
  )



plot(dfOutput$gasForecast~dfOutput$month
     , lty="solid"
     , type = "l"
     , col="blue"
)
lines(dfOutput$gasActuals~dfOutput$month)

  