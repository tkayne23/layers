import { MOCK_LEDGERS, MOCK_NEW_ASSET } from './../shared/ledger.mock';
import { LedgerService } from './../shared/ledger.service';
import { CoreState } from 'app/core/store';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/withLatestFrom';
import 'rxjs/add/observable/of';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { Actions as LedgerActions, Creators as Ledger } from './ledger-actions';

@Injectable()
export class LedgerEffects {

  @Effect()
  fetch$: Observable<Action> = this.actions$
    .ofType(LedgerActions.LEDGER_FETCH)
    .map(() => Ledger.fetchSuccess(MOCK_LEDGERS()));

  @Effect()
  create$: Observable<Action> = this.actions$
    .ofType(LedgerActions.LEDGER_CREATE)
    .map(toPayload)
    .map(body => Ledger.createSuccess({ ...MOCK_NEW_ASSET, ...body }));

  @Effect()
  update$: Observable<Action> = this.actions$
    .ofType(LedgerActions.LEDGER_UPDATE)
    .map(toPayload)
    .map(body => Ledger.updateSuccess(body));

  constructor(private actions$: Actions, private ledgerService: LedgerService, private store: Store<CoreState>) { }
}