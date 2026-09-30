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

interface Identifiable extends Record<string, unknown> {
  id: number;
}

interface RowChanges {
  id: number;
  changes: Record<string, unknown>;
}

type DataMigrationUpdate = DataMigration['update'][number];

@Injectable({
  providedIn: 'root',
})
export class DataMigrationRunnerService {

  private readonly httpClient = inject(HttpClient);
  private readonly indexedDB = inject(IndexedDbService);
  private readonly metadataService = inject(MetadataService);

  run(): Observable<string[]> {
    return this.loadPendingMigrations().pipe(
      switchMap(pending => this.executeAll(pending)),
      tap(keys => this.logExecuted(keys)),
      catchError(error => {
        console.error('[Migration] run failed', error);
        return of([]);
      }),
    );
  }

  private loadPendingMigrations(): Observable<DataMigration[]> {
    return forkJoin([
      this.loadMigrations(),
      this.loadExecutedMigrationsKeys(),
    ]).pipe(
      map(([migrations, executedMigrationsKeys]) => migrations.filter(migration => !executedMigrationsKeys.has(migration.metadata.key))),
    );
  }

  private loadMigrations(): Observable<DataMigration[]> {
    return this.loadManifest().pipe(
      switchMap(files => files.length ? forkJoin(files.map(file => this.loadMigration(file))) : of([])),
    );
  }

  private loadManifest(): Observable<string[]> {
    return this.httpClient.get<string[]>(MIGRATIONS_MANIFEST);
  }

  private loadMigration(file: string): Observable<DataMigration> {
    return this.httpClient.get<DataMigration>(`${MIGRATIONS_PATH}/${file}`);
  }

  private loadExecutedMigrationsKeys(): Observable<Set<string>> {
    return this.metadataService.list().pipe(
      map(metadata => new Set(metadata.map(item => item.key))),
    );
  }

  /**
   * Executes the migrations sequentially and emits the keys of the executed ones.
   */
  private executeAll(migrations: DataMigration[]): Observable<string[]> {
    return from(migrations).pipe(
      concatMap(migration => this.execute(migration)),
      toArray(),
    );
  }

  private execute(migration: DataMigration): Observable<string> {
    const table = DB_KEYS[migration.target];

    return this.selectRows(table).pipe(
      map(rows => this.computeRowChanges(rows, migration)),
      switchMap(rowChanges => this.applyRowChanges(table, rowChanges)),
      switchMap(() => this.markExecuted(migration)),
    );
  }

  private selectRows(table: string): Observable<Identifiable[]> {
    return defer(() => this.indexedDB.select<Identifiable>(table));
  }

  private computeRowChanges(rows: Identifiable[], migration: DataMigration): RowChanges[] {
    return rows
      .map(row => ({ id: row.id, changes: this.computeChanges(row, migration) }))
      .filter(({ changes }) => Object.keys(changes).length > 0);
  }

  private applyRowChanges(table: string, rowChanges: RowChanges[]): Observable<unknown[]> {
    return rowChanges.length
      ? forkJoin(rowChanges.map(({ id, changes }) => defer(() => this.indexedDB.update(table, id, changes))))
      : of([]);
  }

  private markExecuted(migration: DataMigration): Observable<string> {
    return this.metadataService.create(migration.metadata).pipe(
      map(() => migration.metadata.key),
    );
  }

  private logExecuted(keys: string[]) {
    if (keys.length) {
      console.log(`[Migration] executed ${keys.join(', ')}`);
    }
  }

  private computeChanges(row: Identifiable, { path, update: updates }: DataMigration): Record<string, unknown> {
    return path
      ? this.computePathChanges(row, path, updates)
      : this.computeRowMerge(row, updates);
  }

  /**
   * Returns the `to` of the first update matching the row, to be merged into it.
   */
  private computeRowMerge(row: Identifiable, updates: DataMigrationUpdate[]): Record<string, unknown> {
    return { ...this.findMatchingUpdate(row, updates)?.to };
  }

  /**
   * Returns the updated value at the path, keyed by the path, or nothing when no update matches it.
   */
  private computePathChanges(row: Identifiable, path: string, updates: DataMigrationUpdate[]): Record<string, unknown> {
    const value = this.getValueAtPath(row, path);
    return this.hasMatch(value, updates) ? { [path]: this.applyUpdates(value, updates) } : {};
  }

  private getValueAtPath(row: Identifiable, path: string): unknown {
    return path.split('.').reduce<unknown>(
      (value, key) => this.isPlainObject(value) ? value[key] : undefined,
      row,
    );
  }

  private hasMatch(value: unknown, updates: DataMigrationUpdate[]): boolean {
    const candidates = Array.isArray(value) ? value : [value];
    return candidates.some(candidate => !!this.findUpdateFor(candidate, updates));
  }

  private applyUpdates(value: unknown, updates: DataMigrationUpdate[]): unknown {
    return Array.isArray(value)
      ? value.map(element => this.replaceIfMatching(element, updates))
      : this.replaceIfMatching(value, updates);
  }

  private replaceIfMatching(value: unknown, updates: DataMigrationUpdate[]): unknown {
    return this.findUpdateFor(value, updates)?.to ?? value;
  }

  private findUpdateFor(value: unknown, updates: DataMigrationUpdate[]): DataMigrationUpdate | undefined {
    return this.isPlainObject(value) ? this.findMatchingUpdate(value, updates) : undefined;
  }

  /**
   * Returns the first update whose `from` fields all equal the object's fields.
   */
  private findMatchingUpdate(object: Record<string, unknown>, updates: DataMigrationUpdate[]): DataMigrationUpdate | undefined {
    return updates.find(update => this.hasFields(object, update.from));
  }

  private hasFields(object: Record<string, unknown>, fields: object): boolean {
    return Object.entries(fields).every(([key, value]) => this.isEqual(object[key], value));
  }

  private isPlainObject(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && Object.getPrototypeOf(value) === Object.prototype;
  }

  private isEqual(a: unknown, b: unknown): boolean {
    return JSON.stringify(a) === JSON.stringify(b);
  }

}
