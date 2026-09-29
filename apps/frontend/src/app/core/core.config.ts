import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { inject, provideAppInitializer } from '@angular/core';

import { provideOAuthClient } from 'angular-oauth2-oidc';
import { MessageService } from 'primeng/api';

import { googleAuthInterceptor } from 'app/core/interceptors/google-auth.interceptor';
import { DataMigrationRunnerService } from 'app/core/services/migration/data-migration-runner.service';

export const coreProviders = [
  provideHttpClient(withInterceptors([googleAuthInterceptor])),
  provideOAuthClient(),
  MessageService,
  provideAppInitializer(() => inject(DataMigrationRunnerService).run()),
];
