import { Action, State } from '@ngrx/store';
import * as reduxCrud from 'redux-crud';

const reducers = reduxCrud.default.Map.reducersFor('ledger');
export const reducer = (state, action) => reducers(state, action);
