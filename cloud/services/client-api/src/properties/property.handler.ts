import { Property } from './models/property.model';
import { PropertyController } from './property.controller';
import { PropertyPayload } from './models/event.model';
import { Callback, Context, getUserId } from '../shared/lambda.util';
import { createConnection } from "../shared/connection.service";

const collection = Property
const db = createConnection([collection]);
const controller = new PropertyController(db, collection);

export function create(event: PropertyPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.create(event.body, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function read(event: PropertyPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.read(event.path.id, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function readAll(event: PropertyPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.readAll(user)
    .then(properties => callback(undefined, properties))
    .catch(error => callback(error.message));
}

export function update(event: PropertyPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.update(event.path.id, event.body, user)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function destroy(event: PropertyPayload, context: Context, callback: Callback) {
  const user = getUserId(event);

  controller.destroy(event.path.id, user)
    .then(property => callback(undefined, { message: 'success' }))
    .catch(error => callback(error.message));
}