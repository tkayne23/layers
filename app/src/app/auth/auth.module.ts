import { AuthRequestService } from './shared/auth-request.service';
import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { SharedModule } from 'app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { CognitoAuthService, CognitoConfig } from './shared/cognito/cognito-auth.service';
import { AuthStoreModule } from './store';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { LogoutComponent } from './components/logout/logout.component';

@NgModule({
  imports: [
    SharedModule,
    HttpModule,
    AuthStoreModule,
  ],
  declarations: [LoginComponent, SignupComponent, ConfirmAccountComponent, LogoutComponent],
})
export class AuthModule {
  static forRoot(config: CognitoConfig): ModuleWithProviders {
    return {
      ngModule: AuthModule,
      providers: [
        CognitoAuthService,
        AuthRequestService,
        {provide: CognitoConfig, useValue: config },
      ]
    };
  }
}
