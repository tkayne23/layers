import { HelloPayload } from './event.model';
import { Callback, Context } from '../shared/lambda.model';

export function hello(event: HelloPayload, context: Context, callback: Callback) {
  let name = 'World';

  if (event.query && event.query.foo) {
    name = event.query.foo; // Basically just always just make if block level
    // Theres space here for more query params now
  }

  callback(undefined, {
    message: `Hello ${name}! Thanks for the ${event.method} request!`,
    event: event
  });
}