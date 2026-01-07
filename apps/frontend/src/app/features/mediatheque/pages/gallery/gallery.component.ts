import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { Game } from 'app/features/pixeltheque/models/game';
import { GameService } from 'app/features/pixeltheque/services/game.service';

@Component({
  selector: 'app-gallery',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  private readonly gameService = inject(GameService);
  games = toSignal(this.gameService.list(), { initialValue: [] as Game[] });
}
