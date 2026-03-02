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
  readonly multiple = input<boolean>(false);
  readonly imageUploaded = output<[File, string]>();
  readonly imagesUploaded = output<[File, string][]>();

  upload(event: FileSelectEvent) {
    const multiple = this.multiple();
    multiple ? this.uploadImages(event) : this.uploadImage(event);
  }

  uploadImage(event: FileSelectEvent) {
    const scope = this.blobUrlScope();

    const image = event.currentFiles[0];

    if (!scope) {
      throw new Error('No blob url scope specified');
    }

    this.imageUploaded.emit([image, scope.create(image)]);
  }

  uploadImages(event: FileSelectEvent) {
    const scope = this.blobUrlScope();

    const images = event.currentFiles;

    if (!scope) {
      throw new Error('No blob url scope specified');
    }

    this.imagesUploaded.emit(
      images.map(image => ([image, scope.create(image)]))
    );
  }

}
