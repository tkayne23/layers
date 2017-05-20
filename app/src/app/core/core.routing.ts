import { HomePageComponent, AboutPageComponent } from './pages';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavItemType } from './shared';

export const CoreRoutes: Routes = [
    {path: 'about', component: AboutPageComponent, data: { navItem: { type: NavItemType.NAV, label: 'About', private: true}}}
];

// TODO: figure out how to load store and nav through router
// @NgModule({
//   imports: [RouterModule.forChild(ROUTES)],
//   exports: [RouterModule]
// })
// export class CoreRoutingModule {}