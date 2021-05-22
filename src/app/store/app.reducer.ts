import { ActionReducerMap } from '@ngrx/store';

import * as fromShoppingList from '../shopping-list/store/shopping-list.reducer';
import * as fromAuth from '../auth/store/auth.reducer';

export interface appStore {
  shoppingList: fromShoppingList.State;
  auth: fromAuth.state;
}

export const appReducer: ActionReducerMap<appStore> = {
  shoppingList: fromShoppingList.shoppingListReducer,
  auth: fromAuth.authReducer,
};
