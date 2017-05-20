import { AuthRoutingEffects } from './auth-routing-effects';
import { NgModule } from '@angular/core';
import { environment } from 'environments/environment';
import { REDUCER_PROVIDER } from 'app/core/store/';
import * as fromAuth from './auth-reducer';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'app/auth/store/auth-effects';

// TODO: Replace with @ngrx/store v4 solution
export const REDUCERS = {
  auth: fromAuth.reducer
};

@NgModule({
  imports: [
    EffectsModule.run(AuthEffects),
    EffectsModule.run(AuthRoutingEffects)
  ],
  providers: [
    {
      provide: REDUCER_PROVIDER,
      useValue: REDUCERS,
      multi: true
    }
  ]
})
export class AuthStoreModule {}