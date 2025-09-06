import { Injectable } from '@angular/core';

import { Dexie, IndexableType } from 'dexie';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {

  private readonly db = new Dexie('MinikitRoomDatabase');

  addTable(key: string, indexes: string): void {
    this.db.version(1).stores({
      [key]: indexes,
    });
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

  update<T>(key: string, id: IndexableType, item: T): Promise<unknown> {
    return this.db.table(key).put(item, id);
  }
}
