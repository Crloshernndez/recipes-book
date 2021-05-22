import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { catchError, tap } from 'rxjs/operators';
// import { throwError, BehaviorSubject } from 'rxjs';
import { Store } from '@ngrx/store';

import { User } from './user.model';
// import { environment } from '../../environments/environment';
import * as AuthActions from './store/auth.action';
import * as fromAppStore from '../store/app.reducer';

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
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;
  constructor(
    // private http: HttpClient,
    private store: Store<fromAppStore.appStore>
  ) {}

  public setLogOutTimer(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.store.dispatch(new AuthActions.logOut());
    }, expirationDuration);
  }

  public clearLogOutTimer() {
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
      this.tokenExpirationTimer = null;
    }
  }
}
