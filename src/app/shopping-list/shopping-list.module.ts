import { NgModule } from '@angular/core';
import { ShareModule } from '../share/share.module';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';

import { ShoppingListRoutingModule } from './shopping-list.routing.module';

@NgModule({
  declarations: [ShoppingListComponent, ShoppingEditComponent],
  imports: [ShoppingListRoutingModule, ShareModule, FormsModule],
  providers: [],
})
export class ShoppingListModule {}
