import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GzipService {

  compress(blob: Blob): Observable<Blob> {
    return of(blob).pipe(
      delay(2000),
    );
  }

  decompress(blob: Blob): Observable<Blob> {
    return of(blob).pipe(
      delay(2000),
    );
  }

}
