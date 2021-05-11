import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// import { AuthRoutingModule } from './auth.routing.module';
import { AuthFormComponent } from './auth-form/auth-form.component';
import { ShareModule } from '../share/share.module';

@NgModule({
  declarations: [AuthFormComponent],
  imports: [
    FormsModule,
    ShareModule,
    RouterModule.forChild([
      {
        path: '',
        component: AuthFormComponent,
      },
    ]),
  ],
  exports: [],
})
export class AuthModule {}
