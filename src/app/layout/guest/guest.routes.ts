import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { GuestComponent } from './guest.component';

const routes: Routes = [
    {
        path: '', component: GuestComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
        ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
