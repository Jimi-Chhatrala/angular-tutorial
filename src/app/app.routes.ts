import { Routes } from '@angular/router';
import { LoginComp } from './login-comp/login-comp';
import { DashboardComp } from './dashboard-comp/dashboard-comp';
import { authGuardGuard } from './auth-guard-guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComp,
  },
  {
    path: 'dashboard',
    component: DashboardComp,
    canActivate: [authGuardGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
