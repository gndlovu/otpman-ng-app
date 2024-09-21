import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Login } from '../models/login';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_BASE_URL = environment.API.BASE_URL;

  constructor(private _http: HttpClient) { }

  login(data: Login): Observable<any> {
    return this._http.post<User>(`${this.API_BASE_URL}/auth/users/login`, data);
  }

  validatOtp(data: { pin: string, userId: number }): Observable<any> {
    return this._http.post<{accessToken: string}>(`${this.API_BASE_URL}/auth/otp/validate`, data).pipe(
      tap(auth => {
        localStorage.setItem(this.JWT_TOKEN, auth.accessToken)
      })
    );
  }

  clearJwtToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isAuthenticated(): boolean {
    const jwt = localStorage.getItem(this.JWT_TOKEN);

    return !!jwt;
  }
}
