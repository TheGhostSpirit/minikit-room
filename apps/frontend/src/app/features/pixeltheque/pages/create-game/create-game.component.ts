import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { sharedImports } from 'app/shared/shared.config';
import { GameFormComponent } from 'app/features/pixeltheque/components/game-form/game-form.component';
import { Game } from 'app/features/pixeltheque/models/game';
import { GameService } from 'app/features/pixeltheque/services/game.service';

@Component({
  selector: 'app-create-game',
  imports: [...sharedImports, GameFormComponent],
  templateUrl: './create-game.component.html',
})
export class CreateGameComponent {

  private readonly gameService = inject(GameService);
  private readonly router = inject(Router);

  createGame(game: Game) {
    this.gameService.create(game).subscribe(() => this.router.navigate(['games']));
  }

}
