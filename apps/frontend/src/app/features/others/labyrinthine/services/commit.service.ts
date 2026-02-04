import { Injectable } from '@angular/core';

import { Commit } from 'app/features/others/labyrinthine/models/commit';
import { BaseIndexedDbService } from 'app/core/services/indexed-db/base-indexed-db.service';
import { DB_KEYS } from 'app/core/database';

@Injectable({
  providedIn: 'root',
})
export class CommitService extends BaseIndexedDbService<Commit> {
  dbKey: string = DB_KEYS.commit;
}
