import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Game } from 'app/models/game';

const MOCK_GAMES: Game[] = [
  {
    id: 1,
    name: 'PowerWash Simulator',
    rating: 3,
    platform: 'Xbox',
    format: 'Dématérialisé',
    studio: 'Square Enix',
    summary: 'Lorem ipsum dolor sit amet',
    comment: 'Lorem ipsum dolor sit amet',
  },
  {
    id: 2,
    name: 'Silent Hill 2',
    rating: 4,
    platform: 'PlayStation',
    format: 'Physique',
    studio: 'Konami',
    summary: 'Lorem ipsum dolor sit amet',
    comment: 'Lorem ipsum dolor sit amet',
  },
];

@Injectable({
  providedIn: 'root',
})
export class GameService {

  games = [...MOCK_GAMES];

  list(): Observable<Game[]> {
    return of(this.games);
  }

  findOne(id: number): Observable<Game> {
    const index = this.games.findIndex(g => g.id === id);
    return of(this.games[index]);
  }

  create(game: Game): Observable<Game[]> {
    this.games.push(game);
    return of(this.games);
  }

  delete(id: number): Observable<Game[]> {
    this.games = this.games.filter((g) => g.id !== id);
    return of(this.games);
  }

  modify(id: number, game: Game): Observable<Game[]> {
    const index = this.games.findIndex(g => g.id === id);
    this.games[index] = game;
    return of(this.games);
  }

}
