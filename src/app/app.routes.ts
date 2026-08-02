import { Routes } from '@angular/router';
import { ProfileComp } from './profile-comp/profile-comp';
import { canDeactivateGuard } from './can-deactivate-guard';

export const routes: Routes = [
  {
    path: 'profile',
    component: ProfileComp,
    canDeactivate: [canDeactivateGuard],
  },
];
