import { AuthRoutingEffects } from './auth-routing-effects';
import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { REDUCER_PROVIDER } from 'app/core/store/';
import { AuthEffects } from './auth-effects';
import * as fromAuth from './auth-reducer';

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