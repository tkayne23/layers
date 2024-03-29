## GoCode Docs

This project contains an Angular 4 frontend under the `/app/` directory and a Serverless Framework backend project under `/cloud/`

The frontend uses the latest Angular version. We used @ngrx, a redux clone, to manage state. This lets us handle actions and state changes in a reliable manner. We used Chart.js to draw charts, but because our backend was still migrating, I added mock data that broke the library.

We created surveys using [survey.js](http://surveyjs.org/) and need to integrate those surveys with the application once the dashboard is working.

The backend runs on AWS Lambdas, meaning it can scale quickly and for very little cost. 

We used AWS Cognito to get a complete managed authentication system.

Our analytics and data were actually used by real customers, icluding the city of Greeley. Unfortunately, we had to build out a lot more than needed for the app itself - leading to our ETL and database scripting taking longer than expected. We were not able to connect all of our tables to this app build. We know now what future analyses will look like and we have proven that we would be able to support our customers with a larger set of analytics in the future.

LIVE URL: layers.us.s3-website-us-west-2.amazonaws.com

# Required
- Node.js > v6.10
- npm

# Tools
- Angular CLI
  ```
  npm install -g @angular/cli
  ```

# app
### setup
1. `cd app`
2. `npm install`

### server local
1. `ng serve`

### test
1. `ng test`

# cloud
### setup
1. `cd cloud`
2. `npm install`

### running locally
1. `cd services/client-api`
2. `sls webpack serve`


##
![gocode-logo](https://cloud.githubusercontent.com/assets/100216/12792545/96727a8e-ca69-11e5-9b9a-cddfa80d1c4b.png)
--


[![gocodeboard](https://cloud.githubusercontent.com/assets/100216/12793457/f1c9b830-ca6d-11e5-8016-02d0d37c9cfb.png)](https://waffle.io/GoCodeColorado/layers)
Click on the image above to go to your repository's Waffle board. Your Waffle board is prepopulated with tasks to help guide your team throughout the Go Code Colorado competition.
