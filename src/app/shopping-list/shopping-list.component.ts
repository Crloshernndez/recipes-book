import { Component, OnInit } from '@angular/core';

import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../share/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
  }

  onSelectIngredient(i) {
    this.shoppingListService.ingredientSelected.next(i);
  }
}
