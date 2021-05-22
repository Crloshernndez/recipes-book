import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
// import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { DataStorageService } from '../services/data-storage.service';
// import { AuthenticationService } from '../auth/authentication.service';
import * as fromAppStore from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSubs: Subscription;
  isAuthenticated = false;
  collapsed = true;
  constructor(
    private dataStorageService: DataStorageService,
    // private authenticationService: AuthenticationService,
    // private router: Router,
    private store: Store<fromAppStore.appStore>
  ) {}

  ngOnInit() {
    this.store
      .select('auth')
      .pipe(
        map((authUser) => {
          return authUser.user;
        })
      )
      .subscribe((user) => {
        this.isAuthenticated = !user ? false : true;
      });
  }

  onSaveData() {
    this.dataStorageService.saveRecipes();
  }

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.logOut());
    alert('you are log out!!');
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
