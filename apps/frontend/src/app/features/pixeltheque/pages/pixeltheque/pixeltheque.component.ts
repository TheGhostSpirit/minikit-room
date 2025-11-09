import { Component, inject } from '@angular/core';

import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { Game } from 'app/features/pixeltheque/models/game';
import { GameService } from 'app/features/pixeltheque/services/game.service';

@Component({
  selector: 'app-pixeltheque',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './pixeltheque.component.html',
  styleUrl: './pixeltheque.component.scss'
})
export class PixelthequeComponent {
  icons = {
    trash: f.faTrash,
    plus: f.faPlus,
  };

  private readonly gameService = inject(GameService);

  games$: Observable<Game[]> = this.gameService.list();
  search$ = new BehaviorSubject<string>('');

  filteredGames$ = combineLatest([this.games$, this.search$]).pipe(
    map(
      ([games, searchTerm]) =>
        games.filter(game => game.name.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  );

  onSearch(term: string) {
    this.search$.next(term);
  }

  delete(id: number) {
    this.gameService.delete(id).subscribe();
  }
}
