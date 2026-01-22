import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CosmeticScraperService {

  private readonly httpClient = inject(HttpClient);

  fetchDocument(): Observable<any> {
    return this.httpClient.get('https://labyrinthine.fandom.com/wiki/Customisation');
  }

}
