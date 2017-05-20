import { LedgerComponent } from './components/ledger/ledger.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NavItemType } from 'app/core/shared';

export const LedgerRoutes: Routes = [
    {path: '',
     data: { navItem: { type: NavItemType.NAV, label: 'Ledger', private: true}},
    children: [
      {path: '', component: LedgerComponent},
    ]}
];

// TODO: figure out how to load store and nav through router
// @NgModule({
//   imports: [RouterModule.forChild(ROUTES)],
//   exports: [RouterModule]
// })
// export class LedgerRoutingModule {}