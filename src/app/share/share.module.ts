import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AlertComponent } from './components/alert/alert.component';
import { LoadingSpinerComponent } from './components/loading-spiner/loading-spiner.component';
import { DropdownDirective } from './directives/dropdown.directive';
import { PlaceholderDirective } from './directives/placeholder.directive';

@NgModule({
  declarations: [
    AlertComponent,
    LoadingSpinerComponent,
    DropdownDirective,
    PlaceholderDirective,
  ],
  imports: [CommonModule],
  exports: [
    CommonModule,
    DropdownDirective,
    PlaceholderDirective,
    AlertComponent,
  ],
})
export class ShareModule {}
