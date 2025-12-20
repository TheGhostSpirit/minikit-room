import { Injectable } from '@angular/core';

import { Game } from 'app/features/pixeltheque/models/game';
import { BaseIndexedDbService } from 'app/core/services/indexed-db/base-indexed-db.service';
import { DB_KEYS } from 'app/core/database';

@Injectable({
  providedIn: 'root',
})
export class GameService extends BaseIndexedDbService<Game> {
  dbKey: string = DB_KEYS.game;
}
