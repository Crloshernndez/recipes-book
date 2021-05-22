import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, ofType, Effect } from '@ngrx/effects';
import { of } from 'rxjs';
import { switchMap, catchError, map, tap } from 'rxjs/operators';

import { User } from '../user.model';
import * as AuthActions from './auth.action';
import { environment } from '../../../environments/environment';
import { AuthenticationService } from '../authentication.service';

export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable()
export class AuthEffects {
  @Effect()
  authLogin = this.actions$.pipe(
    ofType(AuthActions.START_LOGIN),
    switchMap((authData: AuthActions.loginStart) => {
      return this.http
        .post<authResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.firebaseApiKey}`,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          map((authData) => {
            return this.handleAuthentication(authData);
          }),
          catchError((errorRes): any => {
            return this.handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  authSignup = this.actions$.pipe(
    ofType(AuthActions.START_SIGNUP),
    switchMap((signupAction: AuthActions.signupStart) => {
      return this.http
        .post<authResponseData>(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.firebaseApiKey}`,
          {
            email: signupAction.payload.email,
            password: signupAction.payload.password,
            returnSecureToken: true,
          }
          //creamos logica para enviar un mensaje dependiendo del tipo de error
        )
        .pipe(
          map((authData) => {
            return this.handleAuthentication(authData);
          }),
          catchError((errorRes): any => {
            return this.handleError(errorRes);
          })
        );
    })
  );

  @Effect()
  authAutologin = this.actions$.pipe(
    ofType(AuthActions.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loaderUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );

      if (loaderUser.token) {
        const expirationDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.authenticationService.setLogOutTimer(expirationDuration);
        return new AuthActions.logInSuccess(loaderUser);
      }

      return { type: 'DUMMY' };
    })
  );

  @Effect({ dispatch: false })
  authRedirect = this.actions$.pipe(
    ofType(AuthActions.SUCCESS_LOGIN, AuthActions.LOGOUT),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.actions$.pipe(
    ofType(AuthActions.LOGOUT),
    tap(() => {
      this.authenticationService.clearLogOutTimer();
      localStorage.removeItem('userData');
    })
  );

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  private handleAuthentication(authData) {
    const expiresDate = new Date(
      new Date().getTime() + +authData.expiresIn * 1000
    );

    const user = new User(
      authData.email,
      authData.localId,
      authData.idToken,
      expiresDate
    );
    this.authenticationService.setLogOutTimer(+authData.expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
    return new AuthActions.logInSuccess(user);
  }

  private handleError(errorRes) {
    let errorMessage = 'An Unknown Error Occurred!!';
    if (!errorRes.error || !errorRes.error.error) {
      return of(new AuthActions.loginFail(errorMessage));
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'Email Already Exist!!';
        break;
      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password Invalid!!!';
        break;
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'To Many Attempts, Please Try Later';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'Email Not Exist!!';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'Password Invalid!!!';
        break;
      case 'USER_DISABLED':
        errorMessage = 'User Disabled';
        break;
    }

    return of(new AuthActions.loginFail(errorMessage));
  }
}
