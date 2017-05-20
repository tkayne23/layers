import { Property } from './models/property.model';
import { PropertyController } from './property.controller';
import { createConnection } from "../shared/connection.service";
import { EventPayload, Callback, Context, getUserId } from '../shared/lambda.model';

const collection = Property
const db = createConnection([collection]);
const controller = new PropertyController(db, collection);

export function create(event: EventPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.create(event.body, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function read(event: EventPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.read(event.path.id, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function readAll(event: EventPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.readAll(user)
    .then(properties => callback(undefined, properties))
    .catch(error => callback(error.message));
}

export function update(event: EventPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.update(event.path.id, event.body, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function destroy(event: EventPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.destroy(event.path.id, user)
    .then(property => callback(undefined, { message: 'success' }))
    .catch(error => callback(error.message));
}
