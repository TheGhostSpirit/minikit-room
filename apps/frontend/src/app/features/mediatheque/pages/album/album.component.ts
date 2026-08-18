import { Component, computed, DestroyRef, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { AlbumService } from 'app/features/mediatheque/services/album.service';
import { BlobUrlService } from 'app/shared/services/blob-url.service';

@Component({
  selector: 'app-album',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './album.component.html'
})
export class AlbumComponent {
  private readonly albumService = inject(AlbumService);
  private readonly blobUrlService = inject(BlobUrlService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);

  icons = {
    addImages: f.faPlus,
    editImages: f.faPen,
    commit: f.faCheck,
  };

  private readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);

  readonly album = toSignal(
    this.route.params.pipe(
      switchMap(params => this.albumService.findOne(+params['id']))
    )
  );

  readonly images = computed(() => this.album()?.images ?? []);

  readonly imageUrls = computed(() =>
    this.images().map(img => this.blobUrlScope.create(img.data))
  );

  readonly selectedImageIndex = signal(0);

  readonly selectedImage = computed(() =>
    this.images()[this.selectedImageIndex()]
  );

  updateLegend(legend: string) {
    const image = this.selectedImage();

    if (image) {
      image.legend = legend;
    }
  }
}
