import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import {
  AuthenticationService,
  authResponseData,
} from '../authentication.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth-form',
  templateUrl: './auth-form.component.html',
  styleUrls: ['./auth-form.component.css'],
})
export class AuthFormComponent implements OnInit {
  isLoginMode: boolean = false;
  isLoading = false;
  error: string = null;
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {
    if (!authForm.valid) {
      return;
    }
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<authResponseData>;

    this.isLoading = true;
    if (this.isLoginMode) {
      authObs = this.authenticationService.singIn(email, password);
    } else {
      authObs = this.authenticationService.singUp(email, password);
    }
    authObs.subscribe(
      (data) => {
        console.log(data);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      //recivimos el mensaje del error
      (errorRes) => {
        console.log(errorRes);
        // asignamos el mensaje a la propiedad error
        this.error = errorRes;
        this.isLoading = false;
      }
    );

    authForm.reset();
  }
}
