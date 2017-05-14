import { Property } from './models/property.model';
import { PropertyController } from './property.controller';
import { EventPayload } from './models/event.model';
import { Callback, Context } from '../shared/lambda.model';

const controller = new PropertyController(Property);

export function create(event: EventPayload, context: Context, callback: Callback) {
  let user = event.claims.sub;

  controller.create(event.body, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function read(event: EventPayload, context: Context, callback: Callback) {
  let user = event.claims.sub;

  controller.read(event.path.id, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function update(event: EventPayload, context: Context, callback: Callback) {
  let user = event.claims.sub;

  controller.update(event.path.id, event.body, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function destroy(event: EventPayload, context: Context, callback: Callback) {
  let user = event.claims.sub;

  controller.destroy(event.path.id, user)
    .then(property => callback(undefined, { message: 'success' }))
    .catch(error => callback(error.message));
}