import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { ShoppingListService } from '../services/shopping-list.service';
import { Ingredient } from '../share/ingredient.model';

import * as shoppingListAction from './store/shopping-list.action';
import * as fromAppStore from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[];

  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<fromAppStore.appStore>
  ) {}

  ngOnInit(): void {
    this.store.select('shoppingList').subscribe((data) => {
      this.ingredients = data.ingredients;
    });
    // this.ingredients = this.shoppingListService.getIngredients();
  }

  onSelectIngredient(index) {
    this.store.dispatch(new shoppingListAction.StartEditIngredient(index));
    // this.shoppingListService.ingredientSelected.next(index);
  }
}
