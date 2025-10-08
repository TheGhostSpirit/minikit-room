import { Routes } from '@angular/router';

import { PixelthequeComponent } from 'app/features/pixeltheque/pages/pixeltheque/pixeltheque.component';
import { EditGameComponent } from 'app/features/pixeltheque/pages/edit-game/edit-game.component';
import { CreateGameComponent } from 'app/features/pixeltheque/pages/create-game/create-game.component';

export const routes: Routes = [
  { title: 'Pixelthèque', path: '', component: PixelthequeComponent },
  { title: 'Modifier un jeu', path: 'edit/:id', component: EditGameComponent },
  { title: 'Créer un jeu', path: 'create', component: CreateGameComponent },
];
