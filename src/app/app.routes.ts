import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guards/auth.guard';
import { GuestGuard } from './shared/guards/guest.guard';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/auth/auth.module').then(m => m.AuthModule), canActivate: [AuthGuard] },
  { path: '', loadChildren: () => import('./layout/guest/guest.module').then(m => m.GuestModule), canActivate: [GuestGuard] },
  { path: '**', component: ErrorComponent },
];
