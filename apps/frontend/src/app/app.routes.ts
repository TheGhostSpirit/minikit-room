import { Routes } from '@angular/router';

import { Pixeltheque } from 'app/pages/pixeltheque/pixeltheque';
import { EditGame } from 'app/pages/edit-game/edit-game';

export const routes: Routes = [
  { title: 'Pixelthèque', path: 'pixeltheque', component: Pixeltheque },
  { title: 'Modifier mon jeu', path: 'game/edit/:id', component: EditGame }
];
