import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { AuthStoreModule } from './store';
import { BasicAuthConfig } from './shared/basic-auth.service';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    HttpModule,
    RouterModule,
    AuthStoreModule,
  ],
  declarations: [LoginComponent, SignupComponent],
})
export class AuthModule {
  static forRoot(config: BasicAuthConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        {provide: BasicAuthConfig, useValue: config },
      ]
    };
  }
}
