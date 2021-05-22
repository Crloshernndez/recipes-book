import {
  Component,
  OnInit,
  ComponentFactoryResolver,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as AppStore from '../../store/app.reducer';
import * as FromAddActions from '../store/auth.action';
import { PlaceholderDirective } from '../../share/directives/placeholder.directive';
import {
  AuthenticationService,
  authResponseData,
} from '../authentication.service';
import { Observable, Subscription } from 'rxjs';
import { AlertComponent } from 'src/app/share/components/alert/alert.component';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  isLoginMode: boolean = false;
  isLoading = false;
  error: string = null;
  closeSub: Subscription;
  private storeSub: Subscription;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<AppStore.appStore>
  ) {}

  ngOnInit() {
    this.storeSub = this.store.select('auth').subscribe((authUser) => {
      this.error = authUser.authError;
      this.isLoading = authUser.loading;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    // let authObs: Observable<authResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      this.store.dispatch(
        new FromAddActions.loginStart({ email: email, password: password })
      );
      // authObs = this.authenticationService.singIn(email, password);
    } else {
      // authObs = this.authenticationService.singUp(email, password);
      this.store.dispatch(
        new FromAddActions.signupStart({ email: email, password: password })
      );
    }
    // authObs.subscribe(
    //   (data) => {
    //     console.log(data);
    //     this.isLoading = false;
    //     this.router.navigate(['/recipes']);
    //   },
    //   //recivimos el mensaje del error
    //   (errorRes) => {
    //     console.log(errorRes);
    //     // asignamos el mensaje a la propiedad error
    //     // this.error = errorRes;
    //     this.showErrorAlert(errorRes);
    //     this.isLoading = false;
    //   }
    // );

    authForm.reset();
  }

  handleError() {
    this.store.dispatch(new FromAddActions.clearError());
  }

  private showErrorAlert(message: string) {
    const alertComponentFactory = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    );

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(
      alertComponentFactory
    );

    componentRef.instance.message = message;

    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  ngOnDestroy() {
    this.closeSub.unsubscribe();
    this.storeSub.unsubscribe();
  }
}
