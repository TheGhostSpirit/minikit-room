import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import * as f from '@fortawesome/free-solid-svg-icons';

import { CommonModule } from 'app/common-module';
import { GameService } from 'app/services/game-service';

@Component({
  selector: 'app-pixeltheque',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './pixeltheque.html',
  styleUrl: './pixeltheque.scss'
})
export class Pixeltheque {
  icons = {
    trash: f.faTrash,
    plus: f.faPlus,
  };

  private readonly gameService = inject(GameService);

  games = this.gameService.list();
}
