import { CognitoUser } from 'amazon-cognito-identity-js';
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

import * as AuthActions from './auth-actions';
import { CognitoAuthService } from '../shared/cognito/cognito-auth.service';
import { UserRegistrationDetails } from 'app/auth/shared/user.model';

@Injectable()
export class AuthEffects {

  @Effect()
  restoreSession$: Observable<Action> = this.actions$
    .ofType(AuthActions.RESTORE_SESSION)
    .startWith(() => new AuthActions.RestoreSessionAction())
    .switchMap( () =>
      this.auth.attemptRestore()
        .map(user => user ? new AuthActions.LoginSuccessAction(user) : new AuthActions.LogoutSuccessAction())
    );

  @Effect()
  logout$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGOUT)
    .withLatestFrom(this.store.select('auth', 'user') as Observable<CognitoUser>)
    .map(([action, user]) => {
      user.signOut();
      return new AuthActions.LogoutSuccessAction();
    })
    .catch(err => Observable.of(new AuthActions.LogoutErrorAction(err.message)));

  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGIN)
    .map(toPayload)
    .switchMap(details =>
      this.auth.login(details.username, details.password, {
        success: user => new AuthActions.LoginSuccessAction(user),
        confirmationRequired: user => new AuthActions.RequireConfirmationAction(user),
        mfaRequired: user => new AuthActions.RequireMfaAction(user),
        newPasswordRequired: user => new AuthActions.RequireNewPasswordAction(user),
      })
    )
    .catch(err => Observable.of(new AuthActions.LoginErrorAction(err.message)));

  @Effect()
  authenticate$: Observable<Action> = this.actions$
    .ofType(AuthActions.LOGIN_SUCCESS)
    .map(toPayload)
    .switchMap(user => {
      return this.auth.authenticate(user)
        .map(token => new AuthActions.AuthenticateAction(token));
    })
    .catch(err => Observable.of(new AuthActions.AuthenticateErrorAction(err.message)));

  @Effect({ dispatch: false })
  identify$ = this.actions$
    .ofType(AuthActions.AUTHENTICATE)
    .map(toPayload)
    .withLatestFrom(this.store.select('auth', 'user') as Observable<CognitoUser>)
    .switchMap(([token, user]) =>
      this.auth.refreshIdentityCredentials(user.getUsername(), token)
    );

  @Effect()
  signup$: Observable<Action> = this.actions$
    .ofType(AuthActions.SIGNUP)
    .map(toPayload)
    .mergeMap(details =>
      this.auth.registerUser(details.username, details.password, details.attributes)
        .map(result => {
          if (result.userConfirmed) {
            return new AuthActions.LoginAction(details);
          } else {
            return new AuthActions.RequireConfirmationAction(result.user);
          }
        })
    )
    .catch(err => Observable.of(new AuthActions.SignupErrorAction(err.message)));

  @Effect()
  confirm$: Observable<Action> = this.actions$
    .ofType(AuthActions.CONFIRM_USER)
    .map(toPayload)
    .switchMap(({ user, verificationCode }) =>
      this.auth.confirmUser(user, verificationCode)
        .map(() => new AuthActions.LoginSuccessAction(user))
    )
    .catch(err => Observable.of(new AuthActions.AuthenticateErrorAction(err.message)));

  constructor(private actions$: Actions, private auth: CognitoAuthService, private store: Store<CoreState>) { }
}
