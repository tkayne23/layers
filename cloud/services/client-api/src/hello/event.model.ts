import { EventPayload } from '../shared/lambda.model';
export interface QueryParameters {
  foo: string;
}

export interface HelloPayload extends EventPayload {
  method: string;
  query: QueryParameters;
}