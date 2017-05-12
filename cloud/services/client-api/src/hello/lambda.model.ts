export interface ResponsePayload {
  message: string;
  event: any;
}

export interface QueryParameters {
  foo: string;
}

export interface EventPayload {
  method: string;
  query: QueryParameters;
}

export interface Callback {
  (error: any, result: ResponsePayload): void;
}