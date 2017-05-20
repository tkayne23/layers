import { RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CoreStoreModule } from './store';
import { NavService } from './shared';

import { HomePageComponent, AboutPageComponent } from './pages';
import { SidebarComponent } from './components/sidebar/sidebar.component';

@NgModule({
  imports: [
    SharedModule,
    CoreStoreModule,
    RouterModule
  ],
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    SidebarComponent
  ],
  exports: [
    SidebarComponent
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
