import { Injectable } from '@angular/core';

import { UserManager, UserManagerSettings, User } from 'oidc-client';
import { environment } from '../../environments/environment';
import { promise } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private manager: UserManager;
  private user: User = null;

  constructor() {
    this.manager = new UserManager(getClientSettings());
    //  this.returnUserDetails();
  }

  public returnUserDetails() {
    let promise = new Promise((resolve, reject) => {
    //TODO
    this.manager.getUser().then(user => {
        this.user = user;
        resolve();
      });
    });
    return promise;
  }

  isLoggedIn(): boolean {
    return this.user != null && !this.user.expired;
  }

  getClaims(): any {
    // var a = this.user.access_token;
    return this.user.profile;
  }

  getAuthorizationHeaderValue(): string {
    return `${this.user.token_type} ${this.user.access_token}`;
  }

  startAuthentication(): Promise<void> {
    return this.manager.signinRedirect();
  }

  logout(): Promise<void> {
    return this.manager.signoutRedirect();
  }

  completeAuthentication(): Promise<void> {
    return this.manager.signinRedirectCallback().then(user => {
      this.user = user;
    });
  }
}

export function getClientSettings(): UserManagerSettings {
  return environment.OidcClient;
}
