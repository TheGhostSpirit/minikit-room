import { Component, inject } from '@angular/core';

import { FileSelectEvent } from 'primeng/fileupload';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { AlbumService } from 'app/features/mediatheque/services/album.service';

@Component({
  selector: 'app-album',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './album.component.html'
})
export class AlbumComponent {
  // private readonly albumService = inject(AlbumService);
  // album = this.albumService.findOne(12);
  images: any[] = [];

  onUpload(event: FileSelectEvent) {
    this.images = event.currentFiles;
  }
}
