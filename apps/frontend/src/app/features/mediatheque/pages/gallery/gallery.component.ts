import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { AlbumService } from 'app/features/mediatheque/services/album.service';
import { Album } from 'app/features/mediatheque/models/album';

@Component({
  selector: 'app-gallery',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './gallery.component.html'
})
export class GalleryComponent {
  private readonly albumService = inject(AlbumService);
  albums = toSignal(this.albumService.list(), { initialValue: [] as Album[] });
}
