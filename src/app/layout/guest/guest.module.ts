import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ROUTES } from './guest.routes';
import { GuestComponent } from './guest.component';

@NgModule({
  declarations: [GuestComponent],
  imports: [
    CommonModule,
    ROUTES,
  ],
})
export class GuestModule { }
