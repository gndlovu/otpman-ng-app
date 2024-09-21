import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _auth: AuthService) { }

  canActivate(): boolean {
    if (!this._auth.isAuthenticated()) {
      this._router.navigate(['/login']);
      return false;
    }

    return true;
  }
}
