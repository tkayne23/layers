import { CognitoIdentityCredentials } from 'aws-sdk';
import { Store } from '@ngrx/store';
import { CoreState } from 'app/core/store/core-store.module';
import { Http, Headers, Request, RequestOptionsArgs } from '@angular/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthRequestService {

  constructor(private http: Http, private store: Store<CoreState>) {}

  request(url: string | Request, options?: RequestOptionsArgs) {
    return this.store.select('auth', 'token')
      .take(1)
      .switchMap((token: string) => {
        const headers = new Headers();
        headers.append('Authorization', token );
        const authed = {
          ...options,
          headers: headers
        };

        return this.http.request(url, authed);
      });
  }

}
