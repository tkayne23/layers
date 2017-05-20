import { AuthStatus } from '../shared/auth-status.enum';
import { Action, State } from '@ngrx/store';
import * as Actions from './auth-actions';
import { LoginSuccessAction, CONFIRM_USER } from './auth-actions';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';

export interface AuthState {
  status: AuthStatus;
  isLoading: boolean;
  user?: CognitoUser;
  token?: any;
  attributes?: CognitoUserAttribute[];
  error?: string;
};

export const initialState: AuthState = {
  status: AuthStatus.LOGGED_OUT,
  isLoading: false
};

export const getLoggedIn = state => state.status === AuthStatus.AUTHENTICATED;

export function reducer(state: AuthState = initialState, action: Actions.Actions): AuthState {
  switch (action.type) {

    case Actions.LOGIN:
    case Actions.SIGNUP:
    case Actions.LOGOUT:
    case Actions.CONFIRM_USER:
    case Actions.CHANGE_PASSWORD: return {
      ...state,
      error: undefined,
      isLoading: true
    };

    case Actions.REQUIRE_CONFIRMATION:
    case Actions.REQUIRE_CONFIRM_EMAIL:
    case Actions.REQUIRE_NEW_PASSWORD:
    case Actions.REQUIRE_MFA:
    case Actions.LOGIN_SUCCESS:
    return {
      ...state,
      status: AuthStatus.AUTHENTICATING,
      error: undefined,
      isLoading: false,
      user: action.payload
    };

    case Actions.AUTHENTICATING: return {
      ...state,
      isLoading: true,
      attributes: action.payload
    };

    case Actions.AUTHENTICATE: return {
      ...state,
      error: undefined,
      isLoading: false,
      status: AuthStatus.AUTHENTICATED,
      token: action.payload
    };

    case Actions.LOGOUT_SUCCESS: return initialState;

    case Actions.LOGIN_ERROR:
    case Actions.SIGNUP_ERROR:
    case Actions.LOGOUT_ERROR:
    case Actions.AUTHENTICATE_ERROR:
    return {
      ...state,
      status: AuthStatus.LOGGED_OUT,
      isLoading: false,
      error: action.payload
    };

    default: return state;
  }
}