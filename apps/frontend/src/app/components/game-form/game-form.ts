import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CommonModule } from 'app/common-module';
import { FORMATS, Game, PLATFORMS } from 'app/models/game';

@Component({
  selector: 'app-game-form',
  imports: [CommonModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.scss',
})
export class GameForm {
  private readonly formBuilder = inject(FormBuilder);
  game = input<Game>();
  formSubmitted = output<Game>();

  form: FormGroup = this.buildForm(this.game());

  platforms = [...PLATFORMS];
  formats = [...FORMATS];

  constructor() {
    effect(() => {
      this.form = this.buildForm(this.game());
    });
  }

  buildForm(game: Game | undefined) {
    return this.formBuilder.group({
      name: [game?.name ?? '', Validators.required],
      rating: [game?.rating ?? 0, Validators.required],
      platform: [game?.platform ?? '', Validators.required],
      format: [game?.format ?? '', Validators.required],
      studio: [game?.studio ?? '', Validators.required],
      summary: [game?.summary ?? '', Validators.required],
      comment: [game?.comment ?? '', Validators.required],
    });
  }

  validate() {
    if (!this.form.valid) {
      return;
    }

    this.formSubmitted.emit(this.form.value);
  }
}
