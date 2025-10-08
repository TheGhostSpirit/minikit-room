import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';

import { Observable, Subject } from 'rxjs';
import * as f from '@fortawesome/free-solid-svg-icons';

import { CommonModule } from 'app/shared/common-module';
import { Game } from 'app/features/pixeltheque/models/game';
import { GameService } from 'app/features/pixeltheque/services/game.service';

@Component({
  selector: 'app-pixeltheque',
  imports: [CommonModule, AsyncPipe],
  templateUrl: './pixeltheque.component.html',
  styleUrl: './pixeltheque.component.scss'
})
export class PixelthequeComponent {
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
