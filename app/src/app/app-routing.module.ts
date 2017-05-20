import { LedgerRoutes } from './ledger/ledger.routes';
import { CoreRoutes } from './core/core.routing';
import { AuthRoutes } from './auth/auth.routing';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavItemType } from './core/shared';
import { AuthModule } from 'app/auth/auth.module';

export const ROUTES: Routes = [
    { path: '',
     redirectTo: 'login',
     pathMatch: 'full',
     data: { navItem: { type: NavItemType.BRAND}},
    },
    {path: 'auth', children: AuthRoutes},
    {path: 'ledger', children: LedgerRoutes},
    ...CoreRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(ROUTES)],
  exports: [RouterModule]
})
export class AppRoutingModule {}


