import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import * as f from '@fortawesome/free-solid-svg-icons';

import { DialogService } from 'primeng/dynamicdialog';

import { sharedDeclarations, sharedImports, sharedProviders } from 'app/shared/shared.config';
import { AlbumService } from 'app/features/mediatheque/services/album.service';
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
  private readonly dialog = inject(DialogService);

  readonly albums = toSignal(this.albumService.list(), { initialValue: [] as Album[] });

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
