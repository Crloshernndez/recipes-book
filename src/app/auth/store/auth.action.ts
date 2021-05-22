import { Action } from '@ngrx/store';
import { User } from '../user.model';

export const START_LOGIN = '[Auth] START_LOGIN';
export const SUCCESS_LOGIN = '[Auth] SUCCESS_LOGIN';
export const FAIL_LOGIN = '[Auth] FAIL_LOGIN';
export const START_SIGNUP = '[AUTH] START_SIGNUP';
export const AUTO_LOGIN = '[Auth] AUTO_LOGIN';
export const LOGOUT = '[Auth] LOGOUT';
export const CLEAR_ERROR = '[Auth] CLEAR_ERROR';

export class loginStart implements Action {
  readonly type = START_LOGIN;

  constructor(public payload: { email: string; password: string }) {}
}

export class logInSuccess implements Action {
  readonly type = SUCCESS_LOGIN;

  constructor(public payload: User) {}
}

export class loginFail implements Action {
  readonly type = FAIL_LOGIN;

  constructor(public payload: string) {}
}

export class signupStart implements Action {
  readonly type = START_SIGNUP;

  constructor(public payload: { email: string; password: string }) {}
}

export class autoLogin implements Action {
  readonly type = AUTO_LOGIN;
}

export class logOut implements Action {
  readonly type = LOGOUT;
}

export class clearError implements Action {
  readonly type = CLEAR_ERROR;
}

export type authActions =
  | loginStart
  | logInSuccess
  | loginFail
  | signupStart
  | autoLogin
  | logOut
  | clearError;
