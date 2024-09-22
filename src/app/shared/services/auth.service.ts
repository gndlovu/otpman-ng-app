import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Login } from '../models/login';
import { User } from '../models/user';
import { Signup } from '../models/signup';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_BASE_URL = environment.API.BASE_URL;

  constructor(private _http: HttpClient) { }

  signup(data: Signup): Observable<User> {
    return this._http.post<User>(`${this.API_BASE_URL}/account/signup`, data);
  }

  login(data: Login): Observable<User> {
    return this._http.post<User>(`${this.API_BASE_URL}/auth/login`, data);
  }

  validatOtp(data: { pin: string, userId: number }): Observable<{accessToken: string}> {
    return this._http.post<{accessToken: string}>(`${this.API_BASE_URL}/auth/otp/verify`, data).pipe(
      tap(auth => {
        localStorage.setItem(this.JWT_TOKEN, auth.accessToken)
      })
    );
  }

  requestOtp(userId: number): Observable<any> {
    return this._http.post<{accessToken: string}>(`${this.API_BASE_URL}/auth/otp/request/${userId}`, {});
  }

  clearJwtToken() {
    localStorage.removeItem(this.JWT_TOKEN);
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  getToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  profile(): Observable<any> {
    return this._http.get(`${this.API_BASE_URL}/users/profile`);
  }
}
