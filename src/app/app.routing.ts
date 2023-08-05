import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const AppRoutes: Routes = [
  { path: '', redirectTo: '/list', pathMatch: 'full' },
  {
    path: 'list',
    loadChildren: () => import('./ToDo/Components/to-do/to-do.module').then(m => m.ToDoModule),        
  },
  {
    path: 'details',
    loadChildren: () => import('./ToDo/Components/details/details.module').then(m => m.DetailsModule),        
  },
  
];

export const routing: ModuleWithProviders<any> = RouterModule.forRoot(AppRoutes);