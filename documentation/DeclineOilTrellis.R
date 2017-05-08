library(lattice) 
library(RPostgreSQL)


drv <- dbDriver("PostgreSQL") 
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="COGCC"
                  , host="localhost"
                  , port = 25432)

sql.str = "SELECT DISTINCT api from \"public\".\"cogcc_decline_oil\" "

api <- dbGetQuery(conn, sql.str)

api <- api[,1]

pdf('DCAOil.pdf', onefile=TRUE)
for (i in api)
{
  sql.str = paste("SELECT * FROM \"public\".\"cogcc_decline_oil\" where api = '",i,"'  ",sep="")
  oilDCA <- dbGetQuery(conn, sql.str)
  
  my.plots <- vector(NROW(oilDCA), mode='list')
  
  print(plot(oilDCA$prodmonth,oilDCA$oilactuals
              ,main = paste("API: ",i,sep="")
              ,xlab = "months"
              ,ylab = "oil"
              )
          ,lines(oilDCA$prodmonth,oilDCA$oilforecast)
          )
    
    my.plots[[i]] <- recordPlot()
}
dev.off()



