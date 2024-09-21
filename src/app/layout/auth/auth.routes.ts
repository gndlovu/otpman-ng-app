import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { AuthComponent } from './auth.component';

const routes: Routes = [
  {
      path: '', component: AuthComponent, children: [
          { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
          { path: 'dashboard', component: DashboardComponent },
      ]
  }
];

export const ROUTES = RouterModule.forChild(routes);
