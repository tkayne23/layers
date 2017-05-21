import { getLoggedIn } from 'app/auth/store/auth-reducer';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthState } from 'app/auth/store/auth-reducer';
import { NavService } from 'app/core/shared';
import { CoreState } from 'app/core/store';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'lys-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  auth$: Observable<AuthState>;

  constructor(public nav: NavService, private store: Store<CoreState>, ) {
    this.auth$ = store.select('auth');
  }

  ngOnInit() {
  }

  loggedIn(auth) {
    return getLoggedIn(auth);
  }

}
