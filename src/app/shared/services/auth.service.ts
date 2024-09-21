import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { Login } from '../models/login';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly API_BASE_URL = environment.API.BASE_URL;

  constructor(private _http: HttpClient) { }

  login(data: Login): Observable<any> {
    return this._http.post(`${this.API_BASE_URL}/auth/users/login`, data).pipe(
      tap(auth => { localStorage.setItem(this.JWT_TOKEN, JSON.stringify(auth)) })
    );
  }

  clearJwtToken() { }
}
