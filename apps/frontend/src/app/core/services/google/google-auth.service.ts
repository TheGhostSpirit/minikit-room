import { Injectable, Signal, inject, signal } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';
import { GoogleUser } from 'app/core/models/google-user';

import { User } from 'app/core/models/user';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {

  private readonly oAuthService = inject(OAuthService);
  private readonly _profile = signal<User | null>(null);
  accessToken = '';

  constructor() {
    this.initConfiguration();
  }

  private async initConfiguration() {
    this.oAuthService.configure(environment.auth.google);
    this.oAuthService.setupAutomaticSilentRefresh();
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    if (this.oAuthService.hasValidIdToken()) {
      this.accessToken = this.oAuthService.getAccessToken();
      this._profile.set(
        GoogleUser.fromObject(this.oAuthService.getIdentityClaims()).convertToGenericUser()
      );
    }
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this._profile.set(null);
    this.accessToken = '';
  }

  get profile(): Signal<User | null> {
    return this._profile.asReadonly();
  }

}
