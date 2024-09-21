import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
  constructor(private _auth: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // if (this._auth.isAuthenticated()) {
    //   req = req.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${this._auth.jwt?.access_token}`
    //     }
    //   });
    // }

    return next.handle(req);
  }
}
