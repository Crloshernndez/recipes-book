import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipeDetails: Recipe;
  indexRecipe: number;

  constructor(
    private recipeService: RecipesService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.recipeDetails = this.recipeService.getRecipeById(+params['id']);
    });
  }

  onAddToSL() {
    this.recipeService.addIngredientsToShoppingList(
      this.recipeDetails.ingredients
    );
  }

  onDelete() {
    this.recipeService.deleteRecipe(+this.route.snapshot.params['id']);
  }
}
