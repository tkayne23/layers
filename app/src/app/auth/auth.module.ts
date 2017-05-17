import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthStoreModule } from './auth-store.module';
import { BasicAuthConfig } from './services/basic-auth.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    AuthStoreModule,
  ],
  declarations: [],
})
export class AuthModule {
  static forRoot(config: any): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {provide: BasicAuthConfig, useValue: config },
      ]
    };
  }
}
