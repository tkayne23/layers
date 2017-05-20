import { LogoutComponent } from './components/logout/logout.component';
import { ConfirmAccountComponent } from './components/confirm-account/confirm-account.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavItemType } from 'app/core/shared';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const AuthRoutes: Routes = [
  {path: 'signup', data: {
    navItem: { type: NavItemType.NAV, private: false, label: 'Sign Up', icon: 'happy-face'}
  }, children: [
    { path: '', component: SignupComponent},
    { path: 'confirm', component: ConfirmAccountComponent}
  ]},
  {path: 'login', component: LoginComponent, data: {
    navItem: { type: NavItemType.NAV, private: false, label: 'Login', icon: 'login'}
  }},
  {path: 'logout', component: LogoutComponent, data: {
    navItem: { type: NavItemType.ACTION, private: true, label: 'Logout', icon: 'logout'}
  }},
];

// TODO: figure out how to load store and nav through router
// @NgModule({
//   imports: [RouterModule.forChild(ROUTES)],
//   exports: [RouterModule]
// })
// export class AuthRoutingModule {}