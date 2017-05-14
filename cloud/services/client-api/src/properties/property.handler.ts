import { Property } from './models/property.model';
import { PropertyService } from './property.service';
import { EventPayload } from './models/event.model';
import { Callback, Context } from '../shared/lambda.model';

const service = new PropertyService(Property);

export function create(event: EventPayload, context: Context, callback: Callback) {
  service.create(event.body)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function read(event: EventPayload, context: Context, callback: Callback) {
  service.read(event.path.id)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function update(event: EventPayload, context: Context, callback: Callback) {
  service.update(event.path.id, event.body)
    .then(property => callback(undefined, property))
    .catch(error => callback(error.message));
}

export function destroy(event: EventPayload, context: Context, callback: Callback) {
  service.destroy(event.path.id)
    .then(property => callback(undefined, { message: 'success' }))
    .catch(error => callback(error.message));
}