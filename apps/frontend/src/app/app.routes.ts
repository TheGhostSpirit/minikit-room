import { Routes } from '@angular/router';

import { googleAuthGuard } from 'app/core/guards/google-auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('app/features/home/home.routes').then(m => m.routes)
  },
  {
    path: 'games',
    loadChildren: () => import('app/features/pixeltheque/pixeltheque.routes').then(m => m.routes),
    canActivate: [googleAuthGuard]
  },
  { path: '**', redirectTo: '' },
];
