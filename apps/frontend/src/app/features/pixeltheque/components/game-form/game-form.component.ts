import { Component, DestroyRef, effect, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { FORMATS, Game, PLATFORMS } from 'app/features/pixeltheque/models/game';
import { BlobUrlService } from 'app/shared/services/blob-url.service';

const DEFAULT_URL = 'assets/games/game-cover-placeholder.jpg';

@Component({
  selector: 'app-game-form',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './game-form.component.html',
})
export class GameFormComponent {
  private readonly formBuilder = inject(FormBuilder);
  private readonly blobUrlService = inject(BlobUrlService);
  private readonly destroyRef = inject(DestroyRef);

  readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);

  readonly game = input<Game>();
  readonly formSubmitted = output<Game>();

  form: FormGroup = this.buildForm(this.game());
  coverUrl = DEFAULT_URL;

  readonly platforms = [...PLATFORMS];
  readonly formats = [...FORMATS];

  readonly formEffect = effect(() => {
    const game = this.game();
    this.form = this.buildForm(game);
    const cover = game?.cover;
    this.coverUrl = !!cover ? this.blobUrlScope.create(cover) : DEFAULT_URL;
  });

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

  changeImage(image: [File, string]) {
    const [file, url] = image;
    this.form.controls['cover'].setValue(file);
    this.coverUrl = url;
  }

  validate() {
    if (!this.form.valid) {
      return;
    }

    this.formSubmitted.emit(this.form.value);
  }
}
