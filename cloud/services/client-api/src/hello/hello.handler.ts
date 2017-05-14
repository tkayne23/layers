import { EventPayload } from './event.model';
import { Callback, Context } from '../shared/lambda.model';

export function hello(event: EventPayload, context: Context, callback: Callback) {
  let name = 'World';
  
  if (event.query && event.query.foo) name = event.query.foo;

  callback(undefined, {
    message: `Hello ${name}! Thanks for the ${event.method} request!`,
    event: event
  });
}