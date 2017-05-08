library(lattice) 
library(RPostgreSQL)


drv <- dbDriver("PostgreSQL") 
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="COGCC"
                  , host="localhost"
                  , port = 25432)

sql.str = "SELECT DISTINCT api from \"public\".\"cogcc_decline_gas\" "

api <- dbGetQuery(conn, sql.str)

api <- api[,1]


pdf('DCAGas.pdf', onefile=TRUE)
for (i in api)
{
  sql.str = paste("SELECT * FROM \"public\".\"cogcc_decline_gas\" where api = '",i,"'  ",sep="")
  gasDCA <- dbGetQuery(conn, sql.str)
  my.plots <- vector(NROW(oilDCA), mode='list')
  print(plot(gasDCA$prodmonth,gasDCA$gasactuals
              ,main = paste("API: ",i,sep="")
              ,xlab = "months"
              ,ylab = "gas"
              )
          ,lines(gasDCA$prodmonth,gasDCA$gasforecast)
          )
    
    my.plots[[i]] <- recordPlot()
}
dev.off()



