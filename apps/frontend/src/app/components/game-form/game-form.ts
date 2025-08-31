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
  formSubmitted = output<Game>({ alias: 'formSubmitted' });
  form: any;

  platforms = [...PLATFORMS];
  formats = [...FORMATS];

  constructor() {
    effect(() => {
      this.form = this.formBuilder.group({
        name: [this.game()?.name, Validators.required],
        rating: [this.game()?.rating, Validators.required],
        platform: [this.game()?.platform, Validators.required],
        format: [this.game()?.format, Validators.required],
        studio: [this.game()?.studio, Validators.required],
        summary: [this.game()?.summary, Validators.required],
        comment: [this.game()?.comment, Validators.required],
      });
    });
  }

  get isValid() {
    return this.form.valid;
  }

  validate() {
    if (!this.form.valid) {
      return;
    }

    this.formSubmitted.emit(this.form.value as Game);
  }
}
