import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';

import { Ingredient } from '../../share/ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  editIngredientSubscription: Subscription;
  selectedIngredient: Ingredient;
  ingredientIndex: number;
  constructor(private shoppingListService: ShoppingListService) {}
  @ViewChild('form') editIngredientForm: NgForm;

  onSubmit(form?: NgForm) {
    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        newIngredient,
        this.ingredientIndex
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editIngredientForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.ingredientIndex);
    this.onClear();
  }

  ngOnInit() {
    this.editIngredientSubscription = this.shoppingListService.ingredientSelected.subscribe(
      (index) => {
        this.editMode = true;
        this.ingredientIndex = index;
        this.selectedIngredient = this.shoppingListService.getIngredient(index);

        this.editIngredientForm.setValue({
          name: this.selectedIngredient.name,
          amount: this.selectedIngredient.amount,
        });
      }
    );
  }

  ngOnDestroy() {
    this.editIngredientSubscription.unsubscribe();
  }
}
