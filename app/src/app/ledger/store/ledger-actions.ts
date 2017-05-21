import { Action } from '@ngrx/store';
import * as reduxCrud from 'redux-crud';

export const Actions = {
  ...reduxCrud.default.actionTypesFor('ledger'),
  LEDGER_FETCH: 'LEDGER_FETCH',
  LEDGER_CREATE: 'LEDGER_CREATE',
  LEDGER_UPDATE: 'LEDGER_UPDATE'
};

export const Creators = reduxCrud.default.actionCreatorsFor('ledger');
