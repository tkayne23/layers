// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  cognito: {
    region: 'us-west-2',
    userPool: 'us-west-2_DfxVyFucn',
    identityPool: 'us-west-2:e8d0939f-6be0-4176-95dc-3ca6c6ee2a43',
    clientId: '30js6k0et08umhhb2qbv30a470'
  }
};
