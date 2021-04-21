import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { RecipesService } from './recipes.service';
import { Recipe } from '../recipes/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataStorageService {
  constructor(
    private recipeService: RecipesService,
    private http: HttpClient
  ) {}

  saveRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://ng-recipe-book-76d90-default-rtdb.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe((response) => {
        console.log(response);
        alert('Recipes were added successfully');
      });
  }

  fetchRecipes() {
    return (
      this.http
        .get<Recipe[]>(
          'https://ng-recipe-book-76d90-default-rtdb.firebaseio.com/recipes.json'
        )
        // indicaremos que si no se envia ningun ingrediente mande un array vacio
        .pipe(
          // con operator map manejaremos cada array
          map((recipes) => {
            // con metodo map manejaremos cada elemento del array
            return recipes.map((recipe) => {
              // retornamos el objeto con todas sus propiedades
              return {
                ...recipe,
                // indicamos que si existe ingredientes los devuelva y si no, ddevuelva una array vacio
                ingredients: recipe.ingredients ? recipe.ingredients : [],
              };
            });
          }),
          tap((recipes) => {
            this.recipeService.setRecipes(recipes);
            console.log(recipes);
          })
        )
    );
  }
}
