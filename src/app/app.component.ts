import { Component, OnInit } from '@angular/core';

import { AuthenticationService } from './auth/authentication.service';
import { Store } from '@ngrx/store';
import * as fromAppStore from './store/app.reducer';
import * as AuthActions from './auth/store/auth.action';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private authenticationService: AuthenticationService,
    private store: Store<fromAppStore.appStore>
  ) {}

  ngOnInit() {
    // this.authenticationService.autoLogin();
    this.store.dispatch(new AuthActions.autoLogin());
  }
}
