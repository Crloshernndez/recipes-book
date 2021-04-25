import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpParams,
} from '@angular/common/http';
import { take, exhaustMap } from 'rxjs/operators';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authenticationService: AuthenticationService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authenticationService.user.pipe(
      take(1),
      exhaustMap((user) => {
        // si no existe un user enviamos la request sin modificarla
        if (!user) {
          return next.handle(req);
        }
        // de lo contrario si existe user modificamos la request agregando el token
        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', user.token),
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
