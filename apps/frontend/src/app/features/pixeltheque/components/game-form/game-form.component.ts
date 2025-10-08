import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FileSelectEvent } from 'primeng/fileupload';

import { CommonModule } from 'app/shared/common-module';
import { FORMATS, Game, PLATFORMS } from 'app/features/pixeltheque/models/game';

//TODO: change assets file structure
const DEFAULT_URL = 'assets/game-form/cover-placeholder.jpg';

@Component({
  selector: 'app-game-form',
  imports: [CommonModule],
  templateUrl: './game-form.component.html',
})
export class GameFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  game = input<Game>();
  formSubmitted = output<Game>();

  form: FormGroup = this.buildForm(this.game());
  coverUrl = DEFAULT_URL;

  platforms = [...PLATFORMS];
  formats = [...FORMATS];

  constructor() {
    effect(() => {
      this.form = this.buildForm(this.game());
      const cover = this.game()?.cover;
      this.coverUrl = !!cover ? this.getCoverUrl(cover) : DEFAULT_URL;
    });
  }

  private getCoverUrl(file: File) {
    return URL.createObjectURL(file);
  }

  private buildForm(game: Game | undefined) {
    return this.formBuilder.group({
      name: [game?.name ?? '', Validators.required],
      rating: [game?.rating ?? 0, Validators.required],
      platform: [game?.platform ?? '', Validators.required],
      format: [game?.format ?? '', Validators.required],
      studio: [game?.studio ?? '', Validators.required],
      summary: [game?.summary ?? '', Validators.required],
      comment: [game?.comment ?? '', Validators.required],
      cover: [game?.cover, Validators.required],
    });
  }

  changeImage(event: FileSelectEvent) {
    const file = event.currentFiles[0];
    this.form.controls['cover'].setValue(file);
    this.coverUrl = this.getCoverUrl(file);
  }

  validate() {
    if (!this.form.valid) {
      return;
    }

    this.formSubmitted.emit(this.form.value);
  }
}
