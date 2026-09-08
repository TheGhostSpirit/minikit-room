import { Component, computed, effect, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';

import { sharedImports } from 'app/shared/shared.config';
import { GameFormComponent } from 'app/features/pixeltheque/components/game-form/game-form.component';
import { Game } from 'app/features/pixeltheque/models/game';
import { GameService } from 'app/features/pixeltheque/services/game.service';

@Component({
  selector: 'app-edit-game',
  imports: [...sharedImports, GameFormComponent],
  templateUrl: './edit-game.component.html',
})
export class EditGameComponent {
  private readonly gameService = inject(GameService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly game = toSignal(this.gameService.findOne(this.getIdFromUrl()), { initialValue: undefined });
  readonly title = computed(() => {
    const game = this.game();
    return `Modifier ${game?.name ?? 'un jeu'}`;
  });

  getIdFromUrl(): number {
    return +(this.route.snapshot.paramMap.get('id') ?? '');
  }

  editGame(game: Game) {
    this.gameService.modify(this.getIdFromUrl(), game).subscribe(() => this.router.navigate(['games']));
  }
}
