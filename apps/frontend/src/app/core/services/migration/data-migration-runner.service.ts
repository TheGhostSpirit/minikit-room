import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable, defer, forkJoin, from, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap, toArray } from 'rxjs/operators';

import { DB_KEYS } from 'app/core/database';
import { DataMigration } from 'app/core/models/data-migration';
import { IndexedDbService } from 'app/core/services/indexed-db/indexed-db.service';
import { MetadataService } from 'app/core/services/metadata/metadata.service';

const MIGRATIONS_PATH = '/assets/migrations';
const MIGRATIONS_MANIFEST = `${MIGRATIONS_PATH}/index.json`;

interface Identifiable {
  id: number;
}

@Injectable({
  providedIn: 'root',
})
export class DataMigrationRunnerService {

  private readonly httpClient = inject(HttpClient);
  private readonly indexedDB = inject(IndexedDbService);
  private readonly metadataService = inject(MetadataService);

  run(): Observable<string[]> {
    return forkJoin([
      this.loadMigrations(),
      this.metadataService.list(),
    ]).pipe(
      map(([migrations, metadata]) => {
        const executedKeys = new Set(metadata.map(item => item.key));
        return migrations.filter(migration => !executedKeys.has(migration.metadata.key));
      }),
      switchMap(pending => from(pending)),
      concatMap(migration => this.execute(migration)),
      toArray(),
      tap(keys => {
        if (keys.length) {
          console.log(`[Migration] executed ${keys.join(', ')}`);
        }
      }),
      catchError(error => {
        console.error('[Migration] run failed', error);
        return of([]);
      }),
    );
  }

  private loadMigrations(): Observable<DataMigration[]> {
    return this.httpClient.get<string[]>(MIGRATIONS_MANIFEST).pipe(
      switchMap(files => files.length
        ? forkJoin(files.map(file => this.httpClient.get<DataMigration>(`${MIGRATIONS_PATH}/${file}`)))
        : of([])
      ),
    );
  }

  private execute(migration: DataMigration): Observable<string> {
    const table = DB_KEYS[migration.target];

    return defer(() => this.indexedDB.select<Identifiable>(table)).pipe(
      map(items => items
        .map(item => ({ item, update: migration.update.find(({ from: source }) => this.matches(item, source)) }))
        .filter(({ update }) => !!update)
      ),
      switchMap(changes => changes.length
        ? forkJoin(changes.map(({ item, update }) => defer(() => this.indexedDB.update(table, item.id, update!.to))))
        : of([])
      ),
      switchMap(() => this.metadataService.create(migration.metadata)),
      map(() => migration.metadata.key),
    );
  }

  private matches(item: object, source: object): boolean {
    return Object.entries(source).every(([key, value]) =>
      JSON.stringify((item as Record<string, unknown>)[key]) === JSON.stringify(value)
    );
  }

}
