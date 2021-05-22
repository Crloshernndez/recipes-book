import { User } from '../user.model';
import * as fromAuthAction from './auth.action';

export interface state {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState = {
  user: null,
  authError: null,
  loading: false,
};

export function authReducer(
  state = initialState,
  action: fromAuthAction.authActions
) {
  switch (action.type) {
    case fromAuthAction.START_LOGIN:
      return {
        ...state,
        authError: null,
        loading: true,
      };
    case fromAuthAction.SUCCESS_LOGIN:
      return {
        ...state,
        user: action.payload,
        authError: null,
        loading: false,
      };
    case fromAuthAction.FAIL_LOGIN:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false,
      };
    case fromAuthAction.LOGOUT:
      return {
        ...state,
        user: null,
        authError: null,
        loading: false,
      };
    case fromAuthAction.CLEAR_ERROR:
      return {
        ...state,
        authError: null,
      };
    default:
      return state;
  }
}
