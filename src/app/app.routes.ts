import { Routes } from '@angular/router';
import { DashboardComp } from './dashboard-comp/dashboard-comp';
import { ProfileComp } from './dashboard-comp/profile-comp/profile-comp';
import { SettingsComp } from './dashboard-comp/settings-comp/settings-comp';
import { HomeComp } from './home-comp/home-comp';
import { AboutComp } from './about-comp/about-comp';
import { ContactComp } from './contact-comp/contact-comp';

export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComp,
    children: [
      {
        path: 'profile',
        component: ProfileComp
      },
      {
        path: 'settings',
        component: SettingsComp
      }
    ]
  },
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeComp
  },
  {
    path: 'about',
    component: AboutComp
  },
  {
    path: 'contact',
    component: ContactComp
  }
];
