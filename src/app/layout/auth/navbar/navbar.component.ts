import { Component } from '@angular/core';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  profile: any;
  isNavbarCollapsed = true;

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit(): void {
    this._auth.profile().subscribe((profile: any) => {
      this.profile = profile;
    });
  }

  onLogout(): void {
    this._auth.clearJwtToken();
    this._router.navigate(['/login']);
  }
}
