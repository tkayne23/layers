import { AuthStatus } from '../shared/auth-status.enum';
import { Action, State } from '@ngrx/store';
import { User } from '../shared/user.model';
import { Actions, LOGIN, LoginAction, LOGIN_SUCCESS } from './auth-actions';

export interface AuthState {
  state: AuthStatus;
  isLoading: boolean;
  user?: User;
  error?: string;
};

export const initialState: AuthState = {
  state: AuthStatus.LOGGED_OUT,
  isLoading: false
};

export const getLoggedIn = state => state.state === AuthStatus.LOGGED_IN;

export function reducer(state: AuthState = initialState, action: Actions): AuthState {
  switch (action.type) {
    case LOGIN_SUCCESS: return {
      ...state,
      user: action.payload
    };
    default: return state;
  }
}