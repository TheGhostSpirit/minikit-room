import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

import { GoogleAuthService } from 'app/core/services/google/google-auth.service';

export const googleAuthGuard: CanActivateFn = () => {
  const authService = inject(GoogleAuthService);
  const router = inject(Router);

  const isLoggedIn =  !!authService.accessToken;

  return isLoggedIn || router.createUrlTree(['/']);
};
