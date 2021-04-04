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
      2,
      'another test',
      'this is another test',
      'https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2020/01/07142059/RFB-1912-3-cachitovegano.jpg',
      [
        new Ingredient('harina', 1),
        new Ingredient('leche', 5),
        new Ingredient('jamon', 1),
      ]
    ),
    new Recipe(
      1,
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

  getRecipeById(id: number) {
    const recipe = this.recipes.find((r) => {
      return r.id === id;
    });
    return recipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingLS.addIngredients(ingredients);
  }
}
