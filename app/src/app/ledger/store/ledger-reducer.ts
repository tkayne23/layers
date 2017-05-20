import { Action, State } from '@ngrx/store';
import { default as reduxCrud } from 'redux-crud';

export const reducer = reduxCrud.Map.reducersFor('ledger');
