import { Component } from '@angular/core';

import { CommonModule } from 'app/common-module';

@Component({
  selector: 'app-edit-game',
  imports: [CommonModule],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.scss'
})
export class EditGame {
  title = 'Modifier un jeu';

  platforms = [
    'Xbox',
    'PlayStation',
    'PC'
  ];

  formats = [
    'Physique',
    'Dématérialisé'
  ];

  name = '';
  rating = 0;
  platform = '';
  format = '';
  studio = '';
  summary = '';
  comment = '';

}
