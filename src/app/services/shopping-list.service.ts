import { Injectable } from '@angular/core';

import { Ingredient } from '../share/ingredient.model';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  ingredientSelected = new Subject<number>();
  private ingredients: Ingredient[] = [];

  constructor() {}

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  getIngredients() {
    return this.ingredients;
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }

  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
  }

  updateIngredient(ingredient: Ingredient, index: number) {
    this.ingredients[index] = ingredient;
  }

  deleteIngredient(index: number) {
    this.ingredients = this.ingredients.splice(index, 1);
  }
}
