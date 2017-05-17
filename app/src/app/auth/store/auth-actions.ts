import { Action } from '@ngrx/store';
import { User, UserCredentials, UserRegistrationDetails } from './../shared/user.model';

export const OAUTH_LOGIN = '[AUTH] OAUTH_LOGIN';
export const LOGIN = '[AUTH] LOGIN';
export const LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS';
export const LOGIN_ERROR = '[AUTH] LOGIN_ERROR';
export const SIGNUP = '[AUTH] SIGNUP';
export const SIGNUP_SUCCESS = '[AUTH] SIGNUP_SUCCESS';
export const SIGNUP_ERROR = '[AUTH] SIGNUP_ERROR';
export const LOGOUT = '[AUTH] LOGOUT';
export const LOGOUT_SUCCESS = '[AUTH] LOGOUT_SUCCESS';
export const LOGOUT_ERROR = '[AUTH] LOGOUT_ERROR';
export const EXPIRE = '[AUTH] EXPIRE';
export const REQUIRE_MFA = '[AUTH] REQUIRE_MFA';
export const REQUIRE_CONFIRM_EMAIL = '[AUTH] REQUIRE_CONFIRM_EMAIL';
export const REQUIRE_NEW_PASSWORD = '[AUTH] REQUIRE_NEW_PASSWORD';

export class OAuthLoginAction implements Action {
  readonly type = OAUTH_LOGIN;

  constructor(public payload: string) { }
}

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: UserCredentials) { }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: User) { }
}

export class LoginErrorAction implements Action {
  readonly type = LOGIN_ERROR;

  constructor(public payload: string) { }
}

export class SignupAction implements Action {
  readonly type = SIGNUP;

  constructor(public payload: UserRegistrationDetails) { }
}

export class SignupSuccessAction implements Action {
  readonly type = SIGNUP_SUCCESS;

  constructor(public payload: User) { }
}

export class SignupErrorAction implements Action {
  readonly type = SIGNUP_ERROR;

  constructor(public payload: string) { }
}

export class ExpireAction implements Action {
  readonly type = EXPIRE;

  constructor() { }
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;

  constructor() { }
}

export class LogoutErrorAction implements Action {
  readonly type = LOGOUT_ERROR;

  constructor(public payload: string) { }
}

export class LogoutSuccessAction implements Action {
  readonly type = LOGOUT_SUCCESS;

  constructor() { }
}

export class RequireMfaAction implements Action {
  readonly type = REQUIRE_MFA;

  constructor() { }
}

export class RequireConfirmEmailAction implements Action {
  readonly type = REQUIRE_CONFIRM_EMAIL;

  constructor() { }
}

export class RequireNewPasswordAction implements Action {
  readonly type = REQUIRE_NEW_PASSWORD;

  constructor() { }
}

export type Actions =
  RequireNewPasswordAction |
  RequireConfirmEmailAction |
  RequireMfaAction |
  LogoutSuccessAction |
  LogoutErrorAction |
  LogoutAction |
  ExpireAction |
  SignupErrorAction |
  SignupSuccessAction |
  SignupAction |
  LoginErrorAction |
  LoginSuccessAction |
  LoginAction |
  OAuthLoginAction ;
