library(lattice) 
library(RPostgreSQL)


drv <- dbDriver("PostgreSQL") 
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="layers"
                  , host="localhost"
                  , port = 25432)

sql.str = "select distinct api12,t2.id from production_forecast_gas t1 inner join well_formation t2 on t1.id_well_formation = t2.id order by t2.id limit 20"

api <- dbGetQuery(conn, sql.str)

api <- api[,1]


pdf('DCAGas.pdf', onefile=TRUE)
for (i in api)
{
  sql.str =  paste("SELECT * FROM production_forecast_gas t1 inner join well_formation t2 on t1.id_well_formation = t2.id where api12 = '",i,"'  ",sep="")
  gasDCA <- dbGetQuery(conn, sql.str)
  my.plots <- vector(NROW(gasDCA), mode='list')
  print(plot(gasDCA$months_on_gas,gasDCA$gas_actuals
              ,main = paste("API: ",i,sep="")
              ,xlab = "months"
              ,ylab = "gas"
              )
          ,lines(gasDCA$months_on_gas,gasDCA$gas_forecast)
          )
    
    my.plots[[i]] <- recordPlot()
}
dev.off()



