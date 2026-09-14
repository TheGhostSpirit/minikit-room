import { Injectable, inject } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';
import { OAuthService } from 'angular-oauth2-oidc';

import { GoogleUser } from 'app/core/models/google-user';
import { User } from 'app/core/models/user';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GoogleAuthService {

  private readonly oAuthService = inject(OAuthService);
  private readonly _profile = new BehaviorSubject<User | null>(null);

  constructor() {
    this.initConfiguration();
  }

  private async initConfiguration() {
    this.oAuthService.configure(environment.auth.google);
    this.oAuthService.setupAutomaticSilentRefresh();

    this.oAuthService.events.subscribe((event) => {
      switch (event.type) {
        case 'token_received':
        case 'silently_refreshed':
          this.updateProfile();
          break;
        case 'silent_refresh_error':
        case 'silent_refresh_timeout':
        case 'session_terminated':
          this.logout();
          break;
      }
    });

    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    if (this.oAuthService.hasValidIdToken()) {
      this.updateProfile();
    }
  }

  private updateProfile() {
    this._profile.next(
      GoogleUser.fromObject(this.oAuthService.getIdentityClaims()).convertToGenericUser()
    );
  }

  login() {
    this.oAuthService.initImplicitFlow();
  }

  logout() {
    this.oAuthService.revokeTokenAndLogout();
    this.oAuthService.logOut();
    this._profile.next(null);
  }

  get profile$(): Observable<User | null> {
    return this._profile.asObservable();
  }

  get accessToken() {
    return this.oAuthService.hasValidAccessToken() ? this.oAuthService.getAccessToken() : '';
  }

}
