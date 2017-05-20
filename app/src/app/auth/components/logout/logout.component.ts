import { LogoutAction } from './../../store/auth-actions';
import { CoreState } from './../../../core/store/core-store.module';
import { Store } from '@ngrx/store';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lys-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {
  
  constructor(private store: Store<CoreState>) { }

  ngOnInit() {
    this.store.dispatch(new LogoutAction());
  }

}
