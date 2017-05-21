// import { LedgerStoreModule } from './store/ledger-store.module';
import { LedgerService } from './shared/ledger.service';
import { SharedModule } from './../shared/shared.module';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { LedgerComponent } from './components/ledger/ledger.component';

@NgModule({
  imports: [
    SharedModule,
    ChartsModule,
    // LedgerStoreModule
  ],
  declarations: [LedgerComponent]
})
export class LedgerModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: LedgerModule,
      providers: [
        LedgerService
      ]
    };
  }
}
