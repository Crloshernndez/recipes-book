import { Injectable, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import * as shoppingListActions from './../shopping-list/store/shopping-list.action';
import * as fromAppStore from '../store/app.reducer';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../share/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  selectedRecipe = new EventEmitter<Recipe>();
  recipeChanged = new Subject<Recipe[]>();

  private recipes = [
    // new Recipe(
    //   'another test',
    //   'this is another test',
    //   'https://d1kxxrc2vqy8oa.cloudfront.net/wp-content/uploads/2020/01/07142059/RFB-1912-3-cachitovegano.jpg',
    //   [
    //     new Ingredient('harina', 1),
    //     new Ingredient('leche', 5),
    //     new Ingredient('jamon', 1),
    //   ]
    // ),
    // new Recipe(
    //   'A test recipe',
    //   'This is a test',
    //   'https://www.elvenezolanocolombia.com/wp-content/uploads/hallaca.jpg',
    //   [
    //     new Ingredient('harina', 1),
    //     new Ingredient('carne', 5),
    //     new Ingredient('hojas', 1),
    //   ]
    // ),
  ];
  constructor(
    private shoppingLS: ShoppingListService,
    private router: Router,
    private store: Store<fromAppStore.appStore>
  ) {}

  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe;
    this.recipeChanged.next(this.recipes);
  }

  getRecipes() {
    return this.recipes;
  }

  getRecipeById(index: number) {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    // this.shoppingLS.addIngredients(ingredients);
    this.store.dispatch(new shoppingListActions.AddIngredients(ingredients));
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.router.navigate(['/recipes']);
  }
}
