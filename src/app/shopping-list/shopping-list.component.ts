import { Component, OnInit } from '@angular/core';

import { Ingredient } from '../share/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [new Ingredient('hojas de platano', 50)];

  constructor() {}

  ngOnInit(): void {}
}
