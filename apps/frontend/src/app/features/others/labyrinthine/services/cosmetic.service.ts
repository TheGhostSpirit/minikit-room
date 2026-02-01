import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, from } from 'rxjs';
import { mergeMap, toArray, map } from 'rxjs/operators';

import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';

@Injectable({
  providedIn: 'root',
})
export class CosmeticService {

  private readonly httpClient = inject(HttpClient);

  list(): Observable<[Cosmetic, Blob][]> {
    return this.httpClient.get<Cosmetic[]>('/assets/labyrinthine/cosmetics.json')
      .pipe(
        mergeMap(cosmetics => from(cosmetics)),
        mergeMap(item => this.getImage(item)),
        toArray()
      );
  }

  getImage(cosmetic: Cosmetic): Observable<[Cosmetic, Blob]> {
    return this.httpClient.get(`/assets/labyrinthine/${cosmetic.id}.img`, { responseType: 'blob' })
      .pipe(
        map(blob => [cosmetic, blob])
      );
  }

}
