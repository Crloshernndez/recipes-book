import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AuthenticationService } from './authentication.service';
import * as fromAppStore from '../store/app.reducer';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private store: Store<fromAppStore.appStore>
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
    return this.store.select('auth').pipe(
      map((authUser) => {
        return authUser.user;
      }),
      map((user) => {
        const isAuth = user ? true : false;

        if (isAuth) {
          return true;
        }
        return this.router.createUrlTree(['auth']);
      })
    );
  }
}
