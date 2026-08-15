import { Routes } from '@angular/router';
import { LoginComp } from './login-comp/login-comp';
import { DashboardComp } from './dashboard-comp/dashboard-comp';
import { ProductComp } from './product-comp/product-comp';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComp,
  },
  {
    path: 'dashboard',
    component: DashboardComp,
  },
  {
    path: 'product/:id',
    component: ProductComp,
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
