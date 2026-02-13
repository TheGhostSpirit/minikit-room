import { Component, input, output } from '@angular/core';

import { FileSelectEvent } from 'primeng/fileupload';

import { sharedImports } from 'app/shared/shared.config';
import { BlobUrlScope } from 'app/shared/services/blob-url.service';

@Component({
  selector: 'app-image-upload',
  imports: [...sharedImports],
  templateUrl: './image-upload.component.html',
})
export class ImageUploadComponent {

  readonly label = input<string>('Changer Image');
  readonly blobUrlScope = input<BlobUrlScope>();
  readonly imageUploaded = output<[File, string]>();

  uploadImage(event: FileSelectEvent) {
    const scope = this.blobUrlScope();
    const image = event.currentFiles[0];

    if (!scope) {
      throw new Error('No blob url scope specified');
    }

    this.imageUploaded.emit([image, scope.create(image)]);
  }

}
