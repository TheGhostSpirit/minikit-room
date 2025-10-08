import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('app/features/home/home.routes').then(m => m.routes)
  },
  {
    path: 'games',
    loadChildren: () => import('app/features/pixeltheque/pixeltheque.routes').then(m => m.routes)
  },
  { path: '**', redirectTo: '' },
];
