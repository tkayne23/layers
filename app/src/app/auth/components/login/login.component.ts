import { LoginAction } from './../../store/auth-actions';
import { Observable } from 'rxjs/Observable';
import { UserCredentials } from './../../shared/user.model';
import { CoreState } from 'app/core/store';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lys-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  details: UserCredentials = {};
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<CoreState>) {
    this.isLoading$ = store.select('auth', 'isLoading');
    this.error$ = store.select('auth', 'error');
  }

  ngOnInit() {
  }

  onLogin() {
    this.store.dispatch(new LoginAction(this.details));
  }

}
