library(lattice) 
library(RPostgreSQL)


drv <- dbDriver("PostgreSQL") 
conn <- dbConnect(drv
                  , user="docker"
                  , password="docker"
                  , dbname="layers"
                  , host="localhost"
                  , port = 25432)

sql.str = "select distinct t2.section,t2.township,t2.range,t2.id_section from type_curve_section_oil t1 inner join vsection_township_range t2 on t2.id_section = t1.id_section order by t2.id_section  limit 20"

sections <- dbGetQuery(conn, sql.str)

id_section <- sections[,4]


pdf('TypeCurveSectionOil.pdf', onefile=TRUE)
for (i in id_section)
{

  sql.str =  paste("SELECT * FROM type_curve_section_oil t1 inner join vsection_township_range t2 on t2.id_section = t1.id_section WHERE t1.id_section = '",i,"'  ",sep="")
  oilTypeCurve <- dbGetQuery(conn, sql.str)
  my.plots <- vector(NROW(oilTypeCurve), mode='list')
  
  sec <- head(oilTypeCurve[,4],1)
  township <- head(oilTypeCurve[,5],1)
  range <- head(oilTypeCurve[,6],1)
  
  
  print(plot(oilTypeCurve$month_num,oilTypeCurve$oil_forecast
             ,main = paste("Sec-Twn-Rng: ",sec,'-',township,'-',range,sep="")
             ,xlab = "months"
             ,ylab = "oil"
  )
  )
    
    my.plots[[i]] <- recordPlot()
}
dev.off()



