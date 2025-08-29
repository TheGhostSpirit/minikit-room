import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { CommonModule } from 'app/common-module';
import { FORMATS, PLATFORMS } from 'app/models/game';

@Component({
  selector: 'app-edit-game',
  imports: [CommonModule],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.scss',
})
export class EditGame {
  title = 'Modifier un jeu';

  platforms = [...PLATFORMS];
  formats = [...FORMATS];

  private readonly formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    name: ['', Validators.required],
    rating: [0, Validators.required],
    platform: ['', Validators.required],
    format: ['', Validators.required],
    studio: ['', Validators.required],
    summary: ['', Validators.required],
    comment: ['', Validators.required],
  });

  get isValid() {
    return this.form.valid;
  }

  validate() {
    if (!this.form.valid) {
      return;
    }

    console.log('valid');
  }
}
