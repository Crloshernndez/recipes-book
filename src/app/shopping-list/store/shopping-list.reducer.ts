import * as shoppingListAction from './shopping-list.action';
import { Ingredient } from 'src/app/share/ingredient.model';

export interface State {
  ingredients: Ingredient[];
  ingredientToEdit: Ingredient;
  ingredientIndex: number;
}

const initialState = {
  ingredients: [new Ingredient('apple', 5)],
  ingredientToEdit: null,
  ingredientIndex: -1,
};

export function shoppingListReducer(
  state = initialState,
  action: shoppingListAction.shoppingListAction
) {
  switch (action.type) {
    case shoppingListAction.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload],
      };
    case shoppingListAction.ADD_INGREDIENTS:
      return {
        ...state,
        ingredients: [...state.ingredients, ...action.payload],
      };
    case shoppingListAction.UPDATE_INGREDIENT:
      const ingredient = state.ingredientToEdit;
      const updatedIngredient = {
        ...ingredient,
        ...action.payload.ingredient,
      };
      const updatedIngredients = [...state.ingredients];
      updatedIngredients[state.ingredientIndex] = updatedIngredient;

      return {
        ...state,
        ingredients: updatedIngredients,
        ingredientToEdit: null,
        ingredientIndex: -1,
      };
    case shoppingListAction.DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((ingredient, ingredientIndex) => {
          return ingredientIndex !== state.ingredientIndex;
        }),
        ingredientToEdit: null,
        ingredientIndex: -1,
      };
    case shoppingListAction.START_EDIT_INGREDIENT:
      return {
        ...state,
        ingredientIndex: action.payload,
        ingredientToEdit: { ...state.ingredients[action.payload] },
      };
    case shoppingListAction.STOP_EDIT_INGREDIENT:
      return {
        ...state,
        ingredientIndex: -1,
        ingredientToEdit: null,
      };
    default:
      return state;
  }
}
