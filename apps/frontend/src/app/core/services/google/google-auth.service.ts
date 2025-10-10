import { Injectable, Signal, inject, signal } from '@angular/core';

import { OAuthService } from 'angular-oauth2-oidc';

import { User } from 'app/core/models/user';
import { environment } from 'environments/environment';

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
    this.accessToken = '';
  }

  get profile(): Signal<User | null> {
    return this._profile.asReadonly();
  }

}
