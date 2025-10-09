import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
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
export class EditGameComponent implements OnInit {
  title = 'Modifier un jeu';

  private readonly gameService = inject(GameService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdRef = inject(ChangeDetectorRef);

  game: Game | undefined;

  ngOnInit() {
    this.gameService.findOne(this.getIdFromUrl())
      .subscribe(game => {
        this.title = `Modifier ${game.name}`;
        this.game = game;
        this.cdRef.detectChanges();
      });
  }

  getIdFromUrl(): number {
    return +(this.route.snapshot.paramMap.get('id') ?? '');
  }

  editGame(game: Game) {
    this.gameService.modify(this.getIdFromUrl(), game).subscribe(() => this.router.navigate(['games']));
  }
}
