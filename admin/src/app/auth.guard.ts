
import { inject } from '@angular/core';
import {
  CanActivateFn,
  Router
} from '@angular/router';

import {
  catchError,
  map,
  of,
  switchMap
} from 'rxjs';

import { Auth } from './services/auth';

export const authGuard: CanActivateFn = (
  route,
  state
) => {
  const router = inject(Router);
  const auth = inject(Auth);

  if (!auth.isLoggedIn()) {
    return router.createUrlTree(['/login']);
  }

  const currentUrl = state.url.split('?')[0];

  return auth.getEmailSetupStatus().pipe(
    switchMap(emailResponse => {
      const needsEmail =
        emailResponse.isEmailSetupRequired;

      if (needsEmail) {
        if (currentUrl === '/setup-email') {
          return of(true);
        }

        return of(
          router.createUrlTree(['/setup-email'])
        );
      }

      return auth.getPasswordChangeStatus().pipe(
        map(passwordResponse => {
          const needsPassword =
            passwordResponse.mustChangePassword;

          if (needsPassword) {
            if (
              currentUrl ===
              '/change-temporary-password'
            ) {
              return true;
            }

            return router.createUrlTree([
              '/change-temporary-password'
            ]);
          }

          if (
            currentUrl === '/setup-email' ||
            currentUrl ===
              '/change-temporary-password'
          ) {
            return router.createUrlTree(['/']);
          }

          return true;
        })
      );
    }),

    catchError(() => {
      auth.logout();

      return of(
        router.createUrlTree(['/login'])
      );
    })
  );
};
