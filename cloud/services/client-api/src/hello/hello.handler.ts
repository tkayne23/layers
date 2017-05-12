import { Callback, EventPayload } from './lambda.model';
import { Context } from '../shared/lambda-context.model';

export function hello(event: EventPayload, context: Context, callback: Callback) {
  callback(undefined, {
    message: `Method: ${event.method}, Param: ${event.query.foo}`,
    event: event
  });
}