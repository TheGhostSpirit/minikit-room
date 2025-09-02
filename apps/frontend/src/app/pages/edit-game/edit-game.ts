import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from 'app/common-module';
import { GameForm } from 'app/components/game-form/game-form';
import { Game } from 'app/models/game';
import { GameService } from 'app/services/game-service';

@Component({
  selector: 'app-edit-game',
  imports: [CommonModule, GameForm],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.scss',
})
export class EditGame implements OnInit {
  title = 'Modifier un jeu';

  private readonly gameService = inject(GameService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  game: Game | undefined;

  ngOnInit() {
    this.gameService.findOne(this.getIdFromUrl())
      .subscribe(game => {
        this.title = `Modifier ${game.name}`;
        this.game = game;
      });
  }

  getIdFromUrl(): number {
    return +(this.route.snapshot.paramMap.get('id') ?? '');
  }

  editGame(game: Game) {
    this.gameService.modify(this.getIdFromUrl(), game).subscribe(() => this.router.navigate(['pixeltheque']));
  }
}
