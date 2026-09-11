import { inject, Injectable } from '@angular/core';

import { Dexie, IndexableType, UpdateSpec } from 'dexie';

import { DB_INDEXES } from 'app/core/database';
import { SyncMetadataService } from 'app/core/services/sync/sync-metadata.service';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {

  private readonly db = new Dexie(environment.database.name);
  private readonly syncMetadata = inject(SyncMetadataService);

  constructor() {
    this.db.version(1).stores(DB_INDEXES);
  }

  select<T>(key: string): Promise<T[]> {
    return this.db.table(key).toArray();
  }

  selectOne<T>(key: string, id: IndexableType): Promise<T> {
    return this.db.table(key).get({ id });
  }

  add<T>(key: string, item: T): Promise<unknown> {
    return this.db.table(key).add(item).then(result => {
      this.syncMetadata.markDirty();
      return result;
    });
  }

  delete(key: string, id: IndexableType): Promise<unknown> {
    return this.db.table(key).delete(id).then(result => {
      this.syncMetadata.markDirty();
      return result;
    });
  }

  update<T extends UpdateSpec<unknown>>(key: string, id: IndexableType, item: T): Promise<unknown> {
    return this.db.table(key).update(id, item).then(result => {
      this.syncMetadata.markDirty();
      return result;
    });
  }
}
