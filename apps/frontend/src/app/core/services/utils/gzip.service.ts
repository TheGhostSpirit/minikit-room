import { Injectable } from '@angular/core';

import { bindCallback, defer, Observable, of } from 'rxjs';
import { delay, map, switchMap } from 'rxjs/operators';

import { gzip, gunzip } from 'fflate';

@Injectable({
  providedIn: 'root',
})
export class GzipService {

  compress(blob: Blob): Observable<Blob> {
    return this.blobToUint8Array(blob).pipe(
      switchMap(data => this.gzip(data)),
      map(compressed => this.uint8ArrayToBlob(compressed)),
    );
  }

  decompress(blob: Blob): Observable<Blob> {
    return this.blobToUint8Array(blob).pipe(
      switchMap(data => this.gunzip(data)),
      map(decompressed => this.uint8ArrayToBlob(decompressed)),
    );
  }

  private blobToUint8Array(blob: Blob): Observable<Uint8Array> {
    return defer(() => blob.arrayBuffer())
      .pipe(
        map(buffer => new Uint8Array(buffer))
      );
  }

  private uint8ArrayToBlob(data: Uint8Array): Blob {
    return new Blob([new Uint8Array(data)], { type: 'application/gzip' });
  }

  private gzip(data: Uint8Array): Observable<Uint8Array> {
    return bindCallback(gzip)(data).pipe(
      map(([_, data]) => data)
    );
  }

  private gunzip(data: Uint8Array): Observable<Uint8Array> {
    return bindCallback(gunzip)(data).pipe(
      map(([_, data]) => data)
    );
  }

}
