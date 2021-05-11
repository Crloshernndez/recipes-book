import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorPageComponent } from './error-page/error-page.component';

import { TestDirective } from './share/directives/test.directive';

import { AuthInterceptorService } from './auth/auth-interceptor.service';

import { AppRoutingModule } from './app.routing.module';

import { ShareModule } from './share/share.module';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TestDirective,
    ErrorPageComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule, ShareModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
