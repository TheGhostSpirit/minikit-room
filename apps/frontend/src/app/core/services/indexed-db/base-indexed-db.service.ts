import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, Observable, defer } from 'rxjs';
import { first, switchMap, tap } from 'rxjs/operators';

import { UpdateSpec } from 'dexie';

import { IndexedDbService } from 'app/core/services/indexed-db/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export abstract class BaseIndexedDbService<T extends UpdateSpec<unknown>> {

  private readonly indexedDB = inject(IndexedDbService);

  private subject = new BehaviorSubject<T[]>([]);
  private data = this.subject.asObservable();

  protected abstract dbKey: string;

  list(): Observable<T[]> {
    return defer(() => this.indexedDB.select<T>(this.dbKey)).pipe(
      tap((items) => this.subject.next(items)),
      switchMap(() => this.data),
      first(),
    );
  }

  findOne(id: number): Observable<T> {
    return defer(() => this.indexedDB.selectOne<T>(this.dbKey, id)).pipe(first());
  }

  create(item: T): Observable<T[]> {
    return defer(() => this.indexedDB.add<T>(this.dbKey, item)).pipe(
      switchMap(() => this.list())
    );
  }

  delete(id: number): Observable<T[]> {
    return defer(() => this.indexedDB.delete(this.dbKey, id)).pipe(
      switchMap(() => this.list())
    );
  }

  modify(id: number, item: T): Observable<T[]> {
    return defer(() => this.indexedDB.update(this.dbKey, id, item)).pipe(
      switchMap(() => this.list())
    );
  }

}
