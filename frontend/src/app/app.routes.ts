import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: '/transfers', pathMatch: 'full' },
  { path: 'transfers', loadComponent: () => import('./features/transfer-list/transfer-list.component').then(m => m.TransferListComponent) },
  { path: 'transfers/new', loadComponent: () => import('./features/transfer-create/transfer-create.component').then(m => m.TransferCreateComponent) },
];
