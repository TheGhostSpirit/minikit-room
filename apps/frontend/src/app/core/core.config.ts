import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideOAuthClient } from 'angular-oauth2-oidc';

import { googleAuthInterceptor } from 'app/core/interceptors/google-auth.interceptor';

export const coreProviders = [
  provideHttpClient(withInterceptors([googleAuthInterceptor])),
  provideOAuthClient(),
];
