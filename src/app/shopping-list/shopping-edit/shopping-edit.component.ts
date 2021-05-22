import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as ShoppingListActions from '../store/shopping-list.action';
import * as fromAppStore from '../../store/app.reducer';
import { Ingredient } from '../../share/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  editMode: boolean = false;
  // editIngredientSubscription: Subscription;
  onInitSubscription: Subscription;
  selectedIngredient: Ingredient;

  constructor(private store: Store<fromAppStore.appStore>) {}
  @ViewChild('form') editIngredientForm: NgForm;

  ngOnInit() {
    this.onInitSubscription = this.store
      .select('shoppingList')
      .subscribe((stateData) => {
        if (stateData.ingredientIndex > -1) {
          this.editMode = true;
          this.selectedIngredient = stateData.ingredientToEdit;
          this.editIngredientForm.setValue({
            name: this.selectedIngredient.name,
            amount: this.selectedIngredient.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit(form?: NgForm) {
    const formValue = form.value;
    const newIngredient = new Ingredient(formValue.name, formValue.amount);

    if (this.editMode) {
      this.store.dispatch(
        new ShoppingListActions.UpdateIngredient({
          ingredient: newIngredient,
        })
      );
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    this.editMode = false;
    form.reset();
  }

  onClear() {
    this.editIngredientForm.reset();
    this.editMode = false;
    this.store.dispatch(new ShoppingListActions.StopEditIngredient());
  }

  onDelete() {
    // this.shoppingListService.deleteIngredient(this.ingredientIndex);
    this.store.dispatch(new ShoppingListActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy() {
    // this.editIngredientSubscription.unsubscribe();
    this.onInitSubscription.unsubscribe();
    this.onClear();
  }
}
