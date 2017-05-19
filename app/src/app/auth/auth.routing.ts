import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavItemType } from 'app/core/shared';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const AuthRoutes: Routes = [
  {path: 'signup', component: SignupComponent, data: {
    navItem: { type: NavItemType.NAV, private: false, label: 'Sign Up', icon: 'happy-face'}
  }},
  {path: 'login', component: LoginComponent, data: {
    navItem: { type: NavItemType.NAV, private: false, label: 'Login', icon: 'login'}
  }},
];

// TODO: figure out how to load store and nav through router
// @NgModule({
//   imports: [RouterModule.forChild(ROUTES)],
//   exports: [RouterModule]
// })
// export class AuthRoutingModule {}