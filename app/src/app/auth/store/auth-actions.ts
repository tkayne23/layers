import { Action } from '@ngrx/store';
import { UserCredentials, UserRegistrationDetails } from './../shared/user.model';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { CognitoIdentityCredentials } from 'aws-sdk';

// Session
export const RESTORE_SESSION = '[AUTH] RESTORE_SESSION';
export const EXPIRE = '[AUTH] EXPIRE';

// Credentials
export const AUTHENTICATING = '[AUTH] AUTHENTICATING';
export const AUTHENTICATE = '[AUTH] AUTHENTICATE';
export const REQUIRE_CONFIRMATION = '[AUTH] REQUIRE_CONFIRMATION';
export const CONFIRM_USER = '[AUTH] CONFIRM_USER';
export const REQUIRE_CONFIRM_EMAIL = '[AUTH] REQUIRE_CONFIRM_EMAIL';
export const CONFIRM_EMAIL = '[AUTH] CONFIRM_EMAIL';
export const REQUIRE_NEW_PASSWORD = '[AUTH] REQUIRE_NEW_PASSWORD';
export const AUTHENTICATE_ERROR = '[AUTH] AUTHENTICATE_ERROR';

export const REQUIRE_MFA = '[AUTH] REQUIRE_MFA';

export const CHANGE_PASSWORD = '[AUTH] CHANGE_PASSWORD';
export const CHANGE_PASSWORD_SUCCESS = '[AUTH] CHANGE_PASSWORD_SUCCESS';

// Pool Actions
export const OAUTH = '[AUTH] OAUTH';
export const LOGIN = '[AUTH] LOGIN';
export const LOGIN_SUCCESS = '[AUTH] LOGIN_SUCCESS';
export const LOGIN_ERROR = '[AUTH] LOGIN_ERROR';
export const LOGOUT = '[AUTH] LOGOUT';
export const LOGOUT_SUCCESS = '[AUTH] LOGOUT_SUCCESS';
export const LOGOUT_ERROR = '[AUTH] LOGOUT_ERROR';
export const SIGNUP = '[AUTH] SIGNUP';
export const SIGNUP_SUCCESS = '[AUTH] SIGNUP_SUCCESS';
export const SIGNUP_ERROR = '[AUTH] SIGNUP_ERROR';

export class RestoreSessionAction implements Action {
  readonly type = RESTORE_SESSION;

  constructor() { }
}

export class AuthenticatingAction implements Action {
  readonly type = AUTHENTICATING;

  constructor(public payload: CognitoUserAttribute[]) { }
}

export class AuthenticateAction implements Action {
  readonly type = AUTHENTICATE;

  constructor(public payload: string) { }
}

export class AuthenticateErrorAction implements Action {
  readonly type = AUTHENTICATE_ERROR;

  constructor(public payload: string) { }
}


export class OAuthLoginAction implements Action {
  readonly type = OAUTH;

  constructor(public payload: string) { }
}

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: UserCredentials) { }
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: CognitoUser) { }
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

  constructor(public payload: any) { }
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

export class RequireConfirmationAction implements Action {
  readonly type = REQUIRE_CONFIRMATION;

  constructor(public payload: CognitoUser) { }
}

export class ConfirmUserAction implements Action {
  readonly type = CONFIRM_USER;

  constructor(public payload: { user: CognitoUser, verificationCode: string }) { }
}

export class RequireMfaAction implements Action {
  readonly type = REQUIRE_MFA;

  constructor(public payload: CognitoUser) { }
}


export class RequireConfirmEmailAction implements Action {
  readonly type = REQUIRE_CONFIRM_EMAIL;

  constructor(public payload: CognitoUser) { }
}

export class ConfirmEmailAction implements Action {
  readonly type = CONFIRM_EMAIL;

  constructor(public payload: { user: CognitoUser, verificationCode: string }) { }
}

export class RequireNewPasswordAction implements Action {
  readonly type = REQUIRE_NEW_PASSWORD;

  constructor(public payload: CognitoUser) { }
}

export class ChangePasswordAction implements Action {
  readonly type = CHANGE_PASSWORD;

  constructor(public payload: { user: CognitoUser, oldPassword: string, newPassword: string}) { }
}

export class ChangePasswordSuccessAction implements Action {
  readonly type = CHANGE_PASSWORD_SUCCESS;

  constructor() { }
}

export type Actions =
  RestoreSessionAction |
  AuthenticatingAction |
  AuthenticateAction |
  AuthenticateErrorAction |
  LoginSuccessAction |
  LoginErrorAction |
  OAuthLoginAction |
  LoginAction |
  SignupAction |
  SignupSuccessAction |
  SignupErrorAction |
  ExpireAction |
  LogoutAction |
  LogoutErrorAction |
  LogoutSuccessAction |
  RequireConfirmationAction |
  ConfirmUserAction |
  RequireMfaAction |
  RequireConfirmEmailAction |
  ConfirmEmailAction |
  RequireNewPasswordAction |
  ChangePasswordAction |
  ChangePasswordSuccessAction;
