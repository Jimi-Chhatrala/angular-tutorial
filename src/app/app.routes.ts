import { Routes } from '@angular/router';
import { HomeComp } from './home-comp/home-comp';
import { AboutComp } from './about-comp/about-comp';
import { ContactComp } from './contact-comp/contact-comp';
import { PageNotFoundComp } from './page-not-found-comp/page-not-found-comp';

export const routes: Routes = [
  {
    path: '',
    component: HomeComp,
  },
  {
    path: 'about',
    component: AboutComp,
  },
  {
    path: 'contact',
    component: ContactComp,
  },
  {
    path: '**',
    component: PageNotFoundComp,
  },
];
