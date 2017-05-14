export interface QueryParameters {
  foo: string;
}

export interface EventPayload {
  method: string;
  query: QueryParameters;
}