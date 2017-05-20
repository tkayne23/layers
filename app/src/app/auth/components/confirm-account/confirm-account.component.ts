import 'rxjs/add/operator/take';
import { CognitoUser } from 'amazon-cognito-identity-js';
import { LoginAction, ConfirmUserAction } from './../../store/auth-actions';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from './../../shared/user.model';
import { CoreState } from 'app/core/store';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lys-confirm-account',
  templateUrl: './confirm-account.component.html',
  styleUrls: ['./confirm-account.component.scss']
})
export class ConfirmAccountComponent implements OnInit {
  confirmationCode: string;
  username: string;
  isLoading$: Observable<boolean>;
  error$: Observable<string>;
  user$: Observable<CognitoUser>;

  constructor(private store: Store<CoreState>) {
    this.isLoading$ = store.select('auth', 'isLoading');
    this.error$ = store.select('auth', 'error');
    this.user$ = store.select('auth', 'user');
    this.store.subscribe(state => console.log(state));
  }

  ngOnInit() {
  }

  onConfirm() {
    this.user$.take(1).subscribe(user => {
      console.log(user);
      this.store.dispatch(new ConfirmUserAction({ user, verificationCode: this.confirmationCode }));
    });
  }

}
