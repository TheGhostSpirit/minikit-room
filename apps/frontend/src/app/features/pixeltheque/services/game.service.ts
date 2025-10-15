import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, defer } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';

import { Game } from 'app/features/pixeltheque/models/game';
import { IndexedDbService } from 'app/core/services/indexed-db/indexed-db.service';
import { DB_KEYS } from 'app/core/database';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private readonly indexedDB = inject(IndexedDbService);

  private gamesSubject = new BehaviorSubject<Game[]>([]);
  private gamesData = this.gamesSubject.asObservable();

  list(): Observable<Game[]> {
    return defer(() => this.indexedDB.select<Game>(DB_KEYS.game)).pipe(
      tap((games) => this.gamesSubject.next(games)),
      switchMap(() => this.gamesData),
      first(),
    );
  }

  findOne(id: number): Observable<Game> {
    return defer(() => this.indexedDB.selectOne<Game>(DB_KEYS.game, id)).pipe(first());
  }

  create(game: Game): Observable<Game[]> {
    return defer(() => this.indexedDB.add<Game>(DB_KEYS.game, game)).pipe(
      switchMap(() => this.list())
    );
  }

  delete(id: number): Observable<Game[]> {
    return defer(() => this.indexedDB.delete(DB_KEYS.game, id)).pipe(
      switchMap(() => this.list())
    );
  }

  modify(id: number, game: Game): Observable<Game[]> {
    return defer(() => this.indexedDB.update<Game>(DB_KEYS.game, id, game)).pipe(
      switchMap(() => this.list())
    );
  }

}
