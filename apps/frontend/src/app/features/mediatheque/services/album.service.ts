import { Injectable } from '@angular/core';

import { Album } from 'app/features/mediatheque/models/album';
import { BaseIndexedDbService } from 'app/core/services/indexed-db/base-indexed-db.service';
import { DB_KEYS } from 'app/core/database';

@Injectable({
  providedIn: 'root',
})
export class AlbumService extends BaseIndexedDbService<Album> {
  dbKey: string = DB_KEYS.album;
}
