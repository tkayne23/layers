import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as AuthActions from './auth-actions';
import { go } from '@ngrx/router-store';

@Injectable()
export class AuthRoutingEffects {

  @Effect()
  gotoConfirm$: Observable<Action> = this.actions$
    .ofType(AuthActions.REQUIRE_CONFIRMATION)
    .map(() => go(['auth', 'signup', 'confirm']));

  @Effect()
  gotoLogin$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGOUT_SUCCESS)
    .map(() => go(['auth', 'login']));

  @Effect()
  gotoLedger$: Observable<Action> = this.actions$
    .ofType(AuthActions.AUTHENTICATE)
    .map(() => go(['ledger']));

  constructor(private actions$: Actions) { }
}