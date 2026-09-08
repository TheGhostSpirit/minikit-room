import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { AlbumService } from 'app/features/mediatheque/services/album.service';
import { BlobUrlService } from 'app/shared/services/blob-url.service';
import { AlbumImage } from 'app/features/mediatheque/models/album';

@Component({
  selector: 'app-edit-album',
  imports: [...sharedImports, ...sharedDeclarations, CdkDropList, CdkDrag],
  templateUrl: './edit-album.component.html'
})
export class EditAlbumComponent {
  private readonly albumService = inject(AlbumService);
  private readonly blobUrlService = inject(BlobUrlService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  icons = {
    trash: f.faTrash,
    save: f.faCheck,
  };

  readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);

  readonly album = toSignal(
    this.route.params.pipe(
      switchMap(params => this.albumService.findOne(+params['id']))
    )
  );

  readonly images = signal<AlbumImage[]>([]);

  readonly syncImagesOnAlbumChange = effect(() => {
    this.images.set(this.album()?.images ?? []);
  });

  readonly imageThumbnails = computed(() =>
    this.images().map(image => this.blobUrlScope.create(image.data))
  );

  onUpload(files: [File, string][]) {
    this.images.update(images => [
      ...images,
      ...files.map(([data]) => ({ data, legend: '' }))
    ]);
  }

  removeImage(index: number) {
    this.images.update(images => images.filter((_, i) => i !== index));
  }

  drop(event: CdkDragDrop<AlbumImage[]>) {
    this.images.update(images => {
      const reordered = [...images];
      moveItemInArray(reordered, event.previousIndex, event.currentIndex);
      return reordered;
    });
  }

  save() {
    const album = this.album();

    if (album?.id === undefined) return;

    this.albumService.modify(album.id, { ...album, images: this.images() })
      .subscribe(() => this.router.navigate(['/media/album', album.id]));
  }

  cancel() {
    this.router.navigate(['/media/album', this.album()?.id]);
  }
}
