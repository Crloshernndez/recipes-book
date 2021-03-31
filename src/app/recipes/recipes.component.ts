import { Component, OnInit } from '@angular/core';

import { Recipe } from './recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css'],
})
export class RecipesComponent implements OnInit {
  detailsSelectedRecipe: Recipe;
  constructor(private recipeService: RecipesService) {}

  ngOnInit(): void {
    this.recipeService.selectedRecipe.subscribe((selectedRecipe: Recipe) => {
      this.detailsSelectedRecipe = selectedRecipe;
    });
  }
}
