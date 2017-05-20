library(lattice) 
library(RPostgreSQL)


drv <- dbDriver("PostgreSQL") 
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="layers"
                  , host="localhost"
                  , port = 25432)

sql.str = "select distinct api12,t2.id from production_forecast_oil t1 inner join well_formation t2 on t1.id_well_formation = t2.id order by t2.id limit 20"

api <- dbGetQuery(conn, sql.str)

api <- api[,1]


pdf('DCAoil.pdf', onefile=TRUE)
for (i in api)
{
  sql.str =  paste("SELECT * FROM production_forecast_oil t1 inner join well_formation t2 on t1.id_well_formation = t2.id where api12 = '",i,"'  ",sep="")
  oilDCA <- dbGetQuery(conn, sql.str)
  my.plots <- vector(NROW(oilDCA), mode='list')
  print(plot(oilDCA$months_on_oil,oilDCA$oil_actuals
              ,main = paste("API: ",i,sep="")
              ,xlab = "months"
              ,ylab = "oil"
              )
          ,lines(oilDCA$months_on_oil,oilDCA$oil_forecast)
          )
    
    my.plots[[i]] <- recordPlot()
}
dev.off()



