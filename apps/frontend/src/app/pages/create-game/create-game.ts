import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from 'app/common-module';
import { GameForm } from 'app/components/game-form/game-form';
import { Game } from 'app/models/game';
import { GameService } from 'app/services/game-service';

@Component({
  selector: 'app-create-game',
  imports: [CommonModule, GameForm],
  templateUrl: './create-game.html',
  styleUrl: './create-game.scss',
})
export class CreateGame {

  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);

  createGame(game: Game) {
    this.gameService.create(game).subscribe(() => this.router.navigate(['pixeltheque']));
  }

}
