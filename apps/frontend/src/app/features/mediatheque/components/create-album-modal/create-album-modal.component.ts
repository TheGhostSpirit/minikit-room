import { Component, DestroyRef, inject } from '@angular/core';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { AlbumService } from 'app/features/mediatheque/services/album.service';
import { BlobUrlService } from 'app/shared/services/blob-url.service';
import { AlbumImage } from 'app/features/mediatheque/models/album';

@Component({
  selector: 'app-create-album-modal',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './create-album-modal.component.html'
})
export class CreateAlbumModalComponent {
  private readonly dialogRef = inject(DynamicDialogRef);
  private readonly albumService = inject(AlbumService);
  private readonly blobUrlService = inject(BlobUrlService);
  private readonly destroyRef = inject(DestroyRef);

  readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);
  images: AlbumImage[] = [];

  onUpload(files: [File, string][]) {
    this.albumService.create({
      name: 'Album1',
      images: files.map(([data]) => ({ data, legend: '' }))
    }).subscribe(() => this.dialogRef.close());
  }

  cancel() {
    this.dialogRef.close();
  }

}
