import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {Welcome} from './components/pages/welcome/component';
import {GuestGuard} from '../modules/user/services/guest-guard';
import {About} from './components/pages/about/component';
import {Login} from '../modules/user/components/login/component';
import {AuthGuard} from '../modules/user/services/auth-guard';
import {Registration} from '../modules/user/components/register/component';
import {ForgotPasswordModal} from '../modules/user/components/password/forgot/component';
import {Dashboard} from "./components/dashboard/component";

const routes: Routes = [
    {
        path:        'welcome',
        component:   Welcome,
        canActivate: [GuestGuard],
    },
    {
        path:        'about',
        component:   About,
        canActivate: [GuestGuard],
    },
    {
        path:        'login',
        component:   Login,
        canActivate: [GuestGuard],
    },
    {
        path:        'register',
        component:   Registration,
        canActivate: [GuestGuard],
    },
    {
        path:        'forgot-password',
        component:   ForgotPasswordModal,
        canActivate: [GuestGuard],
    },
    {
        path:        'dashboard',
        component:   Dashboard,
        canActivate: [AuthGuard],
    },
    {path: '**', redirectTo: 'welcome', pathMatch: 'full'},
];

export const appRouting: any[] = [];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes);
