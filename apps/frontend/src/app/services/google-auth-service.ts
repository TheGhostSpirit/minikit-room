

import { Injectable, Signal, inject, signal } from '@angular/core';

import { AuthConfig, OAuthService } from 'angular-oauth2-oidc';

import { User } from 'app/models/user';

const authConfig: AuthConfig = {
  issuer: 'https://accounts.google.com',
  redirectUri: window.location.origin,
  clientId: '139840034785-iuud31sup6246d4isd54q3n97oqtjl4k.apps.googleusercontent.com',
  scope: 'openid profile email',
  strictDiscoveryDocumentValidation: false,
};

interface GoogleUser {
  name: string;
  email: string;
  picture: string;
}

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {

  private readonly oAuthService = inject(OAuthService);
  private readonly _profile = signal<User | null>(null);

  constructor() {
    this.initConfiguration();
  }

  private async initConfiguration() {
    this.oAuthService.configure(authConfig);
    this.oAuthService.setupAutomaticSilentRefresh();
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    if (this.oAuthService.hasValidIdToken()) {
      this._profile.set(
        this.mapUser(this.oAuthService.getIdentityClaims() as GoogleUser)
      );
    }
  }

  private mapUser(user: GoogleUser): User {
    return user as User;
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this._profile.set(null);
  }

  get profile(): Signal<User | null> {
    return this._profile.asReadonly();
  }
}
