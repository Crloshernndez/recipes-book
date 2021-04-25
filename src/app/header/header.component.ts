import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

import { DataStorageService } from '../services/data-storage.service';
import { AuthenticationService } from '../auth/authentication.service';

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
    private authenticationService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authenticationService.user.subscribe((user) => {
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
    this.authenticationService.logOut();
    this.router.navigate(['/auth']);
    alert('you are log out!!');
  }

  ngOnDestroy() {
    this.userSubs.unsubscribe();
  }
}
