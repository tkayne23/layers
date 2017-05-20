import 'rxjs/add/observable/of';
import 'rxjs/add/observable/bindNodeCallback';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { CognitoUser, AuthenticationDetails, CognitoUserPool, ISignUpResult, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import * as AWS from 'aws-sdk';
import { CognitoIdentityCredentials } from 'aws-sdk';
import { mkAttrList, sendAttributeVerificationCode } from './cognito-attributes.fn';


export class CognitoConfig {
  region: string;
  userPool: string;
  identityPool: string;
  clientId: string;
}

@Injectable()
export class CognitoAuthService {
  readonly userPool: CognitoUserPool;

  constructor(private config: CognitoConfig) {
    // surprise side-effect!
    AWS.config.region = config.region;
    this.userPool = new CognitoUserPool({
      UserPoolId: config.userPool,
      ClientId: config.clientId,
    });
  }

  attemptRestore() {
    return Observable.of(this.userPool.getCurrentUser());
  }

  /**
  * sends the email verification code and transitions to the correct state
  * @param {object} user - the CognitoUser object
  * @param {object} attributes - the attributes dictionary
  * @return {Promise<object>} a promise that resolves to a redux action
  */
  emailVerificationRequired(user) {
    return Observable.bindNodeCallback(next =>
      sendAttributeVerificationCode(user, 'email')
        .then((required) => {
          next(null, required);
        }, (error) => next(error, undefined))
      );
  }

  /**
  * logs in to the federated identity pool with a JWT
  * @param {string} username - the username
  * @param {string} jwtToken - a token from the session
  * @param {object} config - the react-cognito config
  * @return {Promise<object>} a promise that resolves to the federated identity credentials
  */
  refreshIdentityCredentials(username, jwtToken): Observable<CognitoIdentityCredentials> {
    return Observable.bindNodeCallback(next => {
      const logins = this.buildLogins(username, jwtToken);
      const creds = new CognitoIdentityCredentials(logins);
      creds.refresh((error) => {
        if (error) {
          next(error, null);
        } else {
          // bonus sideeffect
          AWS.config.credentials = creds;
          next(null, creds);
        }
      });
    })();
  }

  /**
  * builds the federated identity pool login structure
  * @param {string} username - the username of the user
  * @param {string} jwtToken - a JWT Token from the session
  */
  private buildLogins(username, jwtToken) {
    const loginDomain = `cognito-idp.${this.config.region}.amazonaws.com`;
    const loginUrl = `${loginDomain}/${this.config.userPool}`;
    const creds = {
      IdentityPoolId: this.config.identityPool,
      Logins: {},
      LoginId: username, // https://github.com/aws/aws-sdk-js/issues/609
    };
    creds.Logins[loginUrl] = jwtToken;
    return creds;
  }

  /**
  * establishes a session with the user pool, and logs into the federated identity
  * pool using a token from the session
  */
  authenticate(user: CognitoUser): Observable<string> {
    if (user != null) {
      return Observable.bindNodeCallback(next => user.getSession(next))()
        .map((session: any) => {
          const jwtToken = session.getIdToken().getJwtToken();
          return jwtToken;
        });
    } else {
      return Observable.throw(Error('User is null'));
    }
  }

  /**
  *
  * Authenticates with a user pool, and handles responses.
  * if the authentication is successful it then logs in to the
  * identity pool.
  */
  login(username, password, mapper: { success, mfaRequired, newPasswordRequired, confirmationRequired }): Observable<any> {
    return Observable.bindNodeCallback(next => {
      const creds = new AuthenticationDetails({
        Username: username,
        Password: password,
      });

      const user = new CognitoUser({
        Username: username,
        Pool: this.userPool,
      });

      user.authenticateUser(creds, {
        onSuccess: () => next(null, mapper.success(user)),
        onFailure: (error) => {
          if (error.code === 'UserNotConfirmedException') {
            return next(null, mapper.confirmationRequired(user));
          } else {
            return next(error, undefined);
          }
        },
        mfaRequired: () => next(null, mapper.mfaRequired(user)),
        newPasswordRequired: () => next(null, mapper.newPasswordRequired(user)),
      });
    })();
  };

  /**
  * sign up this user with the user pool provided
  */
  registerUser(username, password, attributes): Observable<ISignUpResult> {
    const attrs = mkAttrList(attributes).map(data => new CognitoUserAttribute(data));
    return Observable.bindNodeCallback(next => this.userPool.signUp(username, password, attrs, null, next))();
  };

  /**
  * confirm this user with the user pool provided
  */
  confirmUser(user: CognitoUser, verificationCode: string): Observable<any> {
    return Observable.bindNodeCallback(next => user.confirmRegistration(verificationCode, true, next))();
  };


  /**
   * Change a user's password
   * @param {object} user - the cognito user object
   * @param {string} oldPassword - the current password
   * @param {string} newPassword - the new password
  */
  changePassword(user: CognitoUser, oldPassword, newPassword): Observable<string> {
    return Observable.bindNodeCallback(next =>
      user.changePassword(oldPassword, newPassword, next))();
  }

}
