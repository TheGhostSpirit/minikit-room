import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, from } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';

import { Game } from 'app/models/game';
import { IndexedDbService } from 'app/services/indexed-db-service';

@Injectable({
  providedIn: 'root',
})
export class GameService {

  private static readonly DB_KEY = 'game';
  private readonly indexedDB = inject(IndexedDbService);

  constructor() {
    this.indexedDB.addTable(GameService.DB_KEY, '++id');
  }

  private gamesSubject = new BehaviorSubject<Game[]>([]);
  private gamesData = this.gamesSubject.asObservable();

  list(): Observable<Game[]> {
    return from(this.indexedDB.select<Game>(GameService.DB_KEY)).pipe(
      tap((games) => this.gamesSubject.next(games)),
      switchMap(() => this.gamesData)
    );
  }

  findOne(id: number): Observable<Game> {
    return from(this.indexedDB.selectOne<Game>(GameService.DB_KEY, id));
  }

  create(game: Game): Observable<Game[]> {
    return from(this.indexedDB.add<Game>(GameService.DB_KEY, game)).pipe(
      switchMap(() => this.list())
    );
  }

  delete(id: number): Observable<Game[]> {
    return from(this.indexedDB.delete(GameService.DB_KEY, id)).pipe(
      switchMap(() => this.list())
    );
  }

  modify(id: number, game: Game): Observable<Game[]> {
    return from(this.indexedDB.update<Game>(GameService.DB_KEY, id, game)).pipe(
      switchMap(() => this.list())
    );
  }

}
