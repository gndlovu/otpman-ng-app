import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './auth.routes';
import { AuthComponent } from './auth.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [AuthComponent, NavbarComponent],
  imports: [
    CommonModule,
    ROUTES
  ]
})
export class AuthModule { }
