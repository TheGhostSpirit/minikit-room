import { Component, DestroyRef, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
  private readonly formBuilder = inject(FormBuilder);
  private readonly router = inject(Router);

  readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);
  images: AlbumImage[] = [];

  form: FormGroup = this.formBuilder.group({
    name: ['', Validators.required]
  });

  onUpload(files: [File, string][]) {
    this.images = files.map(([data]) => ({ data, legend: '' }));
  }

  submit() {
    if (!this.form.valid) return;

    this.albumService.create({
      name: this.form.value.name,
      images: this.images
    }).subscribe(albums => {
      const newAlbum = albums.reduce((max, a) => (a.id ?? 0) > (max.id ?? 0) ? a : max);
      this.dialogRef.close();
      this.router.navigate(['/media/album', newAlbum.id]);
    });
  }

  cancel() {
    this.dialogRef.close();
  }

}
