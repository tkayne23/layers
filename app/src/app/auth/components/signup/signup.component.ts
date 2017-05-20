import { Observable } from 'rxjs/Rx';
import { SignupAction } from './../../store/auth-actions';
import { UserRegistrationDetails } from './../../shared/user.model';
import { CoreState } from 'app/core/store';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lys-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  tosAccepted = false;
  details: UserRegistrationDetails = { attributes: {} };
  isLoading$: Observable<boolean>;
  error$: Observable<string>;

  constructor(private store: Store<CoreState>) {
    this.isLoading$ = store.select('auth', 'isLoading');
    this.error$ = store.select('auth', 'error');
  }

  ngOnInit() {
  }

  onSignup() {
    this.store.dispatch(new SignupAction(this.details));
  }

}
