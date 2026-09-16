import { Component, computed, inject, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { Game } from 'app/features/pixeltheque/models/game';
import { GameService } from 'app/features/pixeltheque/services/game.service';

@Component({
  selector: 'app-pixeltheque',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './pixeltheque.component.html',
})
export class PixelthequeComponent {
  icons = {
    trash: f.faTrash,
    plus: f.faPlus,
  };

  private readonly gameService = inject(GameService);

  private readonly gamesRefresh = signal(0);
  games = toSignal(
    toObservable(this.gamesRefresh).pipe(switchMap(() => this.gameService.list())),
    { initialValue: [] as Game[] }
  );
  search = signal('');
  filteredGames = computed(() =>
    this.games().filter(game =>
      game.name.toLowerCase().includes(this.search().toLowerCase())
    )
  );

  onSearch(term: string) {
    this.search.set(term);
  }

  delete(id: number) {
    this.gameService.delete(id).subscribe(() => this.gamesRefresh.update(refresh => refresh + 1));
  }
}
