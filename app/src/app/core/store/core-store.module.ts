import { NgModule, InjectionToken } from '@angular/core';
import { routerReducer, RouterState, RouterStoreModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'environments/environment';
import { Action, combineReducers, StoreModule, INITIAL_REDUCER } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

// TODO: Replace with @ngrx/store v4 solution
export interface ReducerProvider<T> {
    [key: string]: (state: T, action: Action) => T;
}

export const REDUCER_PROVIDER = new InjectionToken<ReducerProvider<any>>('core.ReducerProvider');

function rootReducerFactory(providers: ReducerProvider<any>[]) {
  const reducers = {};

  for (const provider of providers) {
    for (const key in provider) {
      if (typeof provider[key] === 'function') {
        reducers[key] = provider[key];
      }
    }
  }

  if (environment.production) {
    return combineReducers(reducers);
  } else {
    return storeFreeze(combineReducers(reducers));
  }
}

export const REDUCERS = {
  router: routerReducer
};

export interface CoreState {
  router: RouterState;
  [key: string]: any;
}

@NgModule({
  imports: [
    StoreModule.provideStore({}),
    RouterStoreModule.connectRouter(),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
  ],
  exports: [StoreModule],
  providers: [
    {
      provide: INITIAL_REDUCER,
      deps: [ REDUCER_PROVIDER ],
      useFactory: rootReducerFactory
    },
    {
      provide: REDUCER_PROVIDER,
      useValue: REDUCERS,
      multi: true
    }
  ]
})
export class CoreStoreModule {}
