import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

export interface authResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(private http: HttpClient) {}

  singUp(email: string, password: string) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDdtaDUEEusbfLB6aUrUZ7nH_gAH36lI6I',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
        //creamos logica para enviar un mensaje dependiendo del tipo de error
      )
      .pipe(
        //capturamos el error con el operator catchError
        catchError(this.handleErrorResponse),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  singIn(email: string, password: string) {
    return this.http
      .post<authResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDdtaDUEEusbfLB6aUrUZ7nH_gAH36lI6I',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleErrorResponse),
        tap((resData) => {
          this.handleAuthentication(
            resData.email,
            resData.localId,
            resData.idToken,
            resData.expiresIn
          );
        })
      );
  }

  logOut() {
    this.user.next(null);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  private handleErrorResponse(errorRes: HttpErrorResponse) {
    // creamos mensaje por default
    let errorMessage = 'An Unknown Error Occurred!!';
    // si el error esta en otro formato
    if (!errorRes.error || !errorRes.error.error) {
      // retornamos el mensaje por default
      return throwError(errorMessage);
    }
    // creamos un switch para cambiar el mensaje que se envia dependiendo del error que ocurrio
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
    // retornamos el mensaje
    return throwError(errorMessage);
  }

  private handleAuthentication(
    email: string,
    id: string,
    token: string,
    expiresIn: string
  ) {
    const expiresDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, id, token, expiresDate);
    this.user.next(user);
    this.autoLogOut(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));

    if (!userData) {
      return;
    }

    const loaderUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );

    if (loaderUser.token) {
      this.user.next(loaderUser);
      const expirationDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogOut(expirationDuration);
    }
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.logOut();
    }, expirationDuration);
  }
}
