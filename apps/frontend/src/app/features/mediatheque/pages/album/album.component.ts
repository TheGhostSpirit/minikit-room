import { Component, DestroyRef, inject } from '@angular/core';

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
  // album = this.albumService.findOne(12);

  readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);
  images: any[] = [];

  onUpload(files: [File, string][]) {
    this.images = files.map(f => f[1]);
  }
}
