import { Component } from '@angular/core';

import { CommonModule } from 'app/common-module';
import { GameForm } from 'app/components/game-form/game-form';
import { Game } from 'app/models/game';

@Component({
  selector: 'app-edit-game',
  imports: [CommonModule, GameForm],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.scss',
})
export class EditGame {
  title = 'Modifier un jeu';

  game = {
    id: 1,
    name: 'PowerWash Simulator',
    rating: 3,
    platform: 'Xbox',
    format: 'Dématérialisé',
    studio: 'Square Enix',
    summary: 'Lorem ipsum dolor sit amet',
    comment: 'Lorem ipsum dolor sit amet',
  } as Game;

  effect() {
    console.log('effect');
  }
}
