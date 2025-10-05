import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Game } from 'app/models/game';
import { IndexedDbService } from 'app/services/indexed-db-service';
import { DB_KEYS } from 'app/database/indexes';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private readonly indexedDB = inject(IndexedDbService);

  private gamesSubject = new BehaviorSubject<Game[]>([]);
  private gamesData = this.gamesSubject.asObservable();

  list(): Observable<Game[]> {
    return from(this.indexedDB.select<Game>(DB_KEYS.game)).pipe(
      tap((games) => this.gamesSubject.next(games)),
      switchMap(() => this.gamesData)
    );
  }

  findOne(id: number): Observable<Game> {
    return from(this.indexedDB.selectOne<Game>(DB_KEYS.game, id));
  }

  create(game: Game): Observable<Game[]> {
    return from(this.indexedDB.add<Game>(DB_KEYS.game, game)).pipe(
      switchMap(() => this.list())
    );
  }

  delete(id: number): Observable<Game[]> {
    return from(this.indexedDB.delete(DB_KEYS.game, id)).pipe(
      switchMap(() => this.list())
    );
  }

  modify(id: number, game: Game): Observable<Game[]> {
    return from(this.indexedDB.update<Game>(DB_KEYS.game, id, game)).pipe(
      switchMap(() => this.list())
    );
  }

}
