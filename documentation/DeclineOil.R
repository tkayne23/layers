library(RPostgreSQL)
library(aRpsDCA)
library(dplyr)
library(lubridate)


api <- as.character('051233829900')



drv <- dbDriver("PostgreSQL") 
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="COGCC"
                  , host="localhost"
                  , port = 25432)
sql.str = paste("SELECT *,
                CASE WHEN LAG(COALESCE(slope,0)) OVER (ORDER BY time_months) >= 0 and coalesce(slope,0) < 0 THEN time_months ELSE 0 END as changeInSlope 
                FROM (
                SELECT 
                a.api,
                a.formation_code,
                report_date,
                COALESCE(oil_vol,0) as oil_vol,
                ROW_NUMBER() OVER (PARTITION BY a.api /*,a.formation_code*/ ORDER BY a.report_date)-1 AS time_months,
                COALESCE(SUM(oil_vol) OVER (PARTITION BY a.api /*,a.formation_code*/ ORDER BY a.report_date),0) AS cum_oil_vol,
                lead(oil_vol) OVER (ORDER BY a.report_date)-oil_vol as slope
                FROM \"public\".\"cogcc_production\" as a
                WHERE api = '",api,"') sq",sep="")




df <- dbGetQuery(conn, sql.str)

sql.str <- "SELECT * FROM \"public\".\"price_nymex_oil\""

nymex <- dbGetQuery(conn, sql.str)

dbDisconnect(conn)

input.t <- df[,5] #prod_month
input.q <- df[,4] #oil_vol
input.Np <- df[,6] #cum_oil_vol
changeInSlopeSeq <- df[,8]



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


if (max(changeInSlopeSeq) > 0) {
  
  for (i in changeInSlopeSeq){
    if (i != 0) {
      
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
      
      #end if stmt
    }
    
    #end for loop
  }
  
} else {
  
  #make this a function
  i =  0
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


#extract final decline attributes
#fit.qi<-fit[[1]][[1]]
#fit.Di<-fit[[1]][[2]]
#fit.b<-fit[[1]][[3]]



dfOutput <-
  merge(
    data.frame(
      prodMonth=as.integer(df$time_months)
      ,oilActuals=as.numeric(df$oil_vol)
    )
    ,data.frame(
      prodMonth=as.integer(forecastFinal$prodMonth)
      ,oilForecast=as.numeric(forecastFinal$forecast)
      ,month=as.Date(min(df$report_date)) + months(forecastFinal$prodMonth)
    )
    ,by="prodMonth"
    ,all=TRUE
  )

dfOutput <- 
  merge(
    dfOutput
    ,data.frame(
      month=as.Date(nymex$month)
      ,nymexOilPrice=as.numeric(nymex$nymexOilPrice)
    )
    ,by="month"
    ,all.x=TRUE
  )



dfOutput$oilWellRev=round(coalesce(dfOutput$oilActuals,dfOutput$oilForecast)*dfOutput$nymexOilPrice,2)
dfOutput$oilForecast=round(dfOutput$oilForecast,0)
dfOutput$api=head(df$api,1)
dfOutput$formation_code=head(df$formation_code,1)
dfOutput$month=as.character(dfOutput$month)

