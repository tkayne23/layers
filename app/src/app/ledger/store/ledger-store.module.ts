// import { NgModule } from '@angular/core';
// import { environment } from 'environments/environment';
// import { REDUCER_PROVIDER } from 'app/core/store/';
// import * as fromLedger from './ledger-reducer';
// import { EffectsModule } from '@ngrx/effects';
// import { LedgerEffects } from './ledger-effects';

// // TODO: Replace with @ngrx/store v4 solution
// export const REDUCERS = () => ({
//   ledger: fromLedger.reducer
// });

// @NgModule({
//   imports: [
//     EffectsModule.run(LedgerEffects),
//   ],
//   providers: [
//     {
//       provide: REDUCER_PROVIDER,
//       useFactory: REDUCERS,
//       multi: true
//     }
//   ]
// })
// export class LedgerStoreModule {}