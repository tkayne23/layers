import { NgModule } from '@angular/core';
import { environment } from 'environments/environment';
import { REDUCER_PROVIDER } from 'app/core/store/';
import * as fromAuth from './auth-reducer';

// TODO: Replace with @ngrx/store v4 solution
export const REDUCERS = {
  auth: fromAuth.reducer
};

@NgModule({
  providers: [
    {
      provide: REDUCER_PROVIDER,
      useValue: REDUCERS,
      multi: true
    }
  ]
})
export class AuthStoreModule {}