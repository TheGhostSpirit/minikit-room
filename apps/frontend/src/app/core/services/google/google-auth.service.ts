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
  private _accessToken = '';

  constructor() {
    this.initConfiguration();
  }

  private async initConfiguration() {
    this.oAuthService.configure(environment.auth.google);
    this.oAuthService.setupAutomaticSilentRefresh();
    await this.oAuthService.loadDiscoveryDocumentAndTryLogin();
    if (this.oAuthService.hasValidIdToken()) {
      this._accessToken = this.oAuthService.getAccessToken();
      this._profile.next(
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
    this._profile.next(null);
    this._accessToken = '';
  }

  get profile$(): Observable<User | null> {
    return this._profile.asObservable();
  }

  get accessToken() {
    return this._accessToken;
  }

}
