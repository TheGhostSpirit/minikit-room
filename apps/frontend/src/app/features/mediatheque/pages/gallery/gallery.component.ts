import { Component, computed, DestroyRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import * as f from '@fortawesome/free-solid-svg-icons';

import { DialogService } from 'primeng/dynamicdialog';

import { sharedDeclarations, sharedImports, sharedProviders } from 'app/shared/shared.config';
import { AlbumService } from 'app/features/mediatheque/services/album.service';
import { BlobUrlService } from 'app/shared/services/blob-url.service';
import { Album } from 'app/features/mediatheque/models/album';
import { CreateAlbumModalComponent } from 'app/features/mediatheque/components/create-album-modal/create-album-modal.component';

@Component({
  selector: 'app-gallery',
  imports: [...sharedImports, ...sharedDeclarations],
  providers: [...sharedProviders],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  icons = {
    plus: f.faPlus,
  };

  private readonly albumService = inject(AlbumService);
  private readonly blobUrlService = inject(BlobUrlService);
  private readonly destroyRef = inject(DestroyRef);
  private readonly dialog = inject(DialogService);
  private readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);

  readonly albums = toSignal(this.albumService.list(), { initialValue: [] as Album[] });

  readonly albumThumbnails = computed(() =>
    new Map(
      this.albums()
        .filter(a => !!a.id && a.images.length > 0)
        .map(a => [a.id!, this.blobUrlScope.create(a.images[0].data)])
    )
  );

  createAlbum() {
    this.dialog.open(
      CreateAlbumModalComponent,
      {
        header: 'Créer un album',
        width: '25vw',
        modal: true,
      }
    );
  }
}
