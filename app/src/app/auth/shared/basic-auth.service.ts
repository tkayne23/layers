import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { UserCredentials, UserRegistrationDetails } from './user.model';

export class BasicAuthConfig {
  SIGNIN_URL: string;
  SIGNUP_URL: string;
  FORGOT_URL: string;
  RESET_URL: string;
}

@Injectable()
export class BasicAuthService {

  constructor(private http: Http, private window: Window, private config: BasicAuthConfig) { }

  public signIn(credentials: UserCredentials) {
    return this.http.post(this.config.SIGNIN_URL, credentials);
  }

  public signUp(credentials: UserRegistrationDetails) {
    return this.http.post(this.config.SIGNUP_URL, credentials);
  }

  public oAuth(url: string) {
    return this.window.open(url);
  }

  public forgotPassword(emailOrUsername: string) {
    return this.http.post(this.config.FORGOT_URL, emailOrUsername);
  }

  public resetPassword(token: string, newPassword: string) {
    return this.http.post(`${this.config.RESET_URL}/${token}`, newPassword);
  }

}
