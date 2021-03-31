import { Injectable, EventEmitter } from '@angular/core';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../share/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  selectedRecipe = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is a test',
      'https://www.elvenezolanocolombia.com/wp-content/uploads/hallaca.jpg',
      [
        new Ingredient('harina', 1),
        new Ingredient('carne', 5),
        new Ingredient('hojas', 1),
      ]
    ),
  ];
  constructor(private shoppingLS: ShoppingListService) {}

  getRecipes() {
    return this.recipes.slice();
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingLS.addIngredients(ingredients);
  }
}
