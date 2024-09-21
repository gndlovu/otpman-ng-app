import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorHandlerService } from '../services/error-handler.service';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private _errHandler: ErrorHandlerService,
    private _auth: AuthService,
    private _router: Router,
  ) { }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((res: HttpErrorResponse) => {
        if (res.error.statusCode === 401) {
          this._auth.clearJwtToken();
          this._router.navigate(['/login']);
        } else {
          this._errHandler.handle(res);
        }

        return throwError(res);
      })
    );
  }
}
