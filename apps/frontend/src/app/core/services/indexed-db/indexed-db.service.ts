import { Injectable } from '@angular/core';

import { Dexie, IndexableType, UpdateSpec } from 'dexie';

import { DB_INDEXES } from 'app/core/database';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {

  private readonly db = new Dexie(environment.database.name);

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
    return this.db.table(key).add(item);
  }

  delete(key: string, id: IndexableType): Promise<unknown> {
    return this.db.table(key).delete(id);
  }

  update<T extends UpdateSpec<unknown>>(key: string, id: IndexableType, item: T): Promise<unknown> {
    return this.db.table(key).update(id, item);
  }
}
