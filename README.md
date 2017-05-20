## GoCode Docs

This project contains an Angular 4 frontend under the `/app/` directory and a Serverless Framework backend project under `/cloud/`

The frontend uses the latest Angular version. We used @ngrx, a redux clone, to manage state. This lets us handle actions and state changes in a reliable manner. We used Chart.js to draw charts, but they broke with the mock data I shoved in last second.

The backend runs on AWS Lambdas, meaning it can scale quickly and for very little cost. 

We used AWS Cognito to get a complete managed authentication system.

Our ETL and database scripting took longer than expected, and we were not able to connect the api for this build.

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
1. `grunt`

### test
1. `grunt test`

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
