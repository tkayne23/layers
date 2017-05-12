export interface Context {
  callbackWaitsForEmptyEventLoop: boolean;
  functionName: string;
  functionVersion: number;
  invokedFunctionArn: string;
  memoryLimitInMB: number;
  awsRequestId: string;
  logGroupName: string;
  logStreamName: string;
  identity?: {
    cognitoIdentityId: string;
    cognitoIdentityPoolId: string;
  };
clientContext: {
  Custom: any;
  client: {
    installation_id: string;
    app_title: string;
    app_version_name: string;
    app_version_code: string;
    app_package_name: string;
  };
  env: {
    platform_version: string;
    platform: string;
    make: string;
    model: string;
    locale: string;
    };
  };
};