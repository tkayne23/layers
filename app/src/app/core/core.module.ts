import { ModuleWithProviders } from '@angular/core';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CoreRoutingModule } from './core-routing.module';
import { CoreStoreModule } from './core-store.module';
import { NavService } from './shared';

import { HomePageComponent, AboutPageComponent } from './pages';

@NgModule({
  imports: [
    SharedModule,
    CoreRoutingModule,
    CoreStoreModule
  ],
  declarations: [
    HomePageComponent,
    AboutPageComponent
  ]
})
export class CoreModule {
  static forRoot(/*config: UserServiceConfig*/): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        // {provide: UserServiceConfig, useValue: config },
        NavService
      ]
    };
  }

  // Guard against this module being imported anywhere other than the root module
  constructor (@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}
