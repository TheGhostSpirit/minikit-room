import { Routes } from '@angular/router';

import { Pixeltheque } from 'app/pages/pixeltheque/pixeltheque';
import { EditGame } from 'app/pages/edit-game/edit-game';
import { CreateGame } from 'app/pages/create-game/create-game';

export const routes: Routes = [
  { title: 'Pixelthèque', path: 'pixeltheque', component: Pixeltheque },
  { title: 'Modifier un jeu', path: 'game/edit/:id', component: EditGame },
  { title: 'Créer un jeu', path: 'game/create', component: CreateGame },
];
