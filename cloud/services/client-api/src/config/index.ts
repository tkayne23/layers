import * as dev from './config.dev';
import * as prod from './config.prod';

let config;

if (process.env.NODE_ENV === 'prod') {
  config = prod;
} else {
  config = dev;
}

export default config;