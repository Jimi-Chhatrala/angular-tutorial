import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideEffects } from '@ngrx/effects';
import { provideState, provideStore } from '@ngrx/store';
import { UserEffects } from './users/user.effects';
import { userFeature } from './users/user.feature';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideEffects([UserEffects]),
    provideStore(),
    provideState(userFeature),
    provideStoreDevtools({
      maxAge: 25,
      logOnly: false,
    }),
  ],
};
