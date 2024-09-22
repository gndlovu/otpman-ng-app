import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from '../../pages/auth/login/login.component';
import { GuestComponent } from './guest.component';
import { SignupComponent } from '../../pages/auth/signup/signup.component';

const routes: Routes = [
    {
        path: '', component: GuestComponent, children: [
            { path: '', redirectTo: 'login', pathMatch: 'full' },
            { path: 'login', component: LoginComponent },
            { path: 'signup', component: SignupComponent },
        ]
    }
];

export const ROUTES = RouterModule.forChild(routes);
