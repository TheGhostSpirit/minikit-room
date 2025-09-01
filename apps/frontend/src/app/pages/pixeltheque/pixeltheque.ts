import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import * as f from '@fortawesome/free-solid-svg-icons';

import { CommonModule } from 'app/common-module';
import { Game } from 'app/models/game';
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

  games: Observable<Game[]> = this.gameService.list();

  delete(id: number) {
    this.gameService.delete(id).subscribe();
  }
}
