import { Action } from '@ngrx/store';

import { Ingredient } from '../../share/ingredient.model';

export const ADD_INGREDIENT = '[ShoppingList] ADD_INGREDIENT';
export const ADD_INGREDIENTS = '[ShoppingList] ADD_INGREDIENTS';
export const UPDATE_INGREDIENT = '[ShoppingList] UPDATE_INGREDIENT';
export const DELETE_INGREDIENT = '[ShoppingList] DELETE_INGREDIENT';
export const START_EDIT_INGREDIENT = '[ShoppingList] START_EDIT_INGREDIENT';
export const STOP_EDIT_INGREDIENT = '[ShoppingList] STOP_EDIT_INGREDIENT';

export class AddIngredient implements Action {
  readonly type = ADD_INGREDIENT;

  constructor(public payload: Ingredient) {}
}

export class AddIngredients implements Action {
  readonly type = ADD_INGREDIENTS;

  constructor(public payload: Ingredient[]) {}
}

export class UpdateIngredient implements Action {
  readonly type = UPDATE_INGREDIENT;

  constructor(public payload: { ingredient: Ingredient }) {}
}

export class DeleteIngredient implements Action {
  readonly type = DELETE_INGREDIENT;
}

export class StartEditIngredient implements Action {
  readonly type = START_EDIT_INGREDIENT;
  constructor(public payload: number) {}
}

export class StopEditIngredient implements Action {
  readonly type = STOP_EDIT_INGREDIENT;
}

export type shoppingListAction =
  | AddIngredient
  | AddIngredients
  | UpdateIngredient
  | DeleteIngredient
  | StartEditIngredient
  | StopEditIngredient;
