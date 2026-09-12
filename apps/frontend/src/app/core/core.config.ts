import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { provideOAuthClient } from 'angular-oauth2-oidc';
import { MessageService } from 'primeng/api';

import { googleAuthInterceptor } from 'app/core/interceptors/google-auth.interceptor';

export const coreProviders = [
  provideHttpClient(withInterceptors([googleAuthInterceptor])),
  provideOAuthClient(),
  MessageService,
];
