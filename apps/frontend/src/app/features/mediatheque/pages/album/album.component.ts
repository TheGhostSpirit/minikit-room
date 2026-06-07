import { Component, computed, DestroyRef, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';

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
  private readonly route = inject(ActivatedRoute);

  private readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);

  readonly album = toSignal(
    this.route.params.pipe(
      switchMap(params => this.albumService.findOne(+params['id']))
    )
  );

  readonly imageUrls = computed(() =>
    (this.album()?.images ?? []).map(img => this.blobUrlScope.create(img.data))
  );
}
