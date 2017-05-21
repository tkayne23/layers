This directory contains the documentation and scripts used for our ETL process

We use PostGres with PostGIS on RDS to store our data.
[We used Pentaho Data Integration to create out ETL flows](http://community.pentaho.com/projects/data-integration/).

We used data sets for:
  - Colordo Counties [link]()
    We use the counties as a dataset, and denormalize them to other tables for area level analytics.
  - PLSS Grid
    We use the PLSS grid as a reference for all area level analytics. Legal descriptions entered by users are verified against it.
  - COGCC
    - Well Permits [link]()
      We use this dataset to display wells. We cross-reference these with PLSS tables to create area level analytics
    - Well Production [link]()
      We use this data to create projections on well production and estimate lifetime value. Projections are used in area     level analytics
    - DSUs [link]()
      We receive scanned paper letters from the api and use machine vision to identify the description of these areas.
  - County Clerk
    - Leases [link]()
      We use these to verify user provided data is accurate. Some are scans and some are modern data.
    - Deeds [link]()
      We use these to verify user provided data is accurate. Some are scans and some are modern data.
  - Nymex Index [link]()
      We create a table of strip pricing and use it in our analyses. Combined with production data, can be used to estimate the value of a well or area.
   
