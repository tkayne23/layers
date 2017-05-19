import { HomePageComponent, AboutPageComponent } from './pages';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavItemType } from './shared';

export const ROUTES: Routes = [
    {path: 'home', component: HomePageComponent, data: { navItem: { type: NavItemType.NAV, label: 'Home'}}},
    {path: 'about', component: AboutPageComponent, data: { navItem: { type: NavItemType.NAV, label: 'About'}}}
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class CoreRoutingModule {}


