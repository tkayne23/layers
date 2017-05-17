
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavItemType } from './core/shared';

export const ROUTES: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full', data: { navItem: { type: NavItemType.BRAND, label: 'Clearly Angular'}}},
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


