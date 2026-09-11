import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, interval, timer } from 'rxjs';
import { catchError, debounceTime, finalize, switchMap } from 'rxjs/operators';

import { GoogleAuthService } from 'app/core/services/google/google-auth.service';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';
import { SyncMetadataService } from 'app/core/services/sync/sync-metadata.service';
import { DriveFile } from 'app/core/models/drive-file';

const PUSH_DEBOUNCE_MS = 3 * 60 * 1000;
const PULL_INTERVAL_MS = 15 * 60 * 1000;
const INITIAL_PULL_DELAY_MS = 5 * 1000;

@Injectable({
  providedIn: 'root',
})
export class AutoSyncService {

  private readonly authService = inject(GoogleAuthService);
  private readonly adminDbService = inject(IndexedDbAdminService);
  private readonly syncMetadata = inject(SyncMetadataService);

  private readonly conflictSubject = new BehaviorSubject<boolean>(false);
  readonly conflict$ = this.conflictSubject.asObservable();

  private syncing = false;

  constructor() {
    this.syncMetadata.dirtyChange$
      .pipe(debounceTime(PUSH_DEBOUNCE_MS))
      .subscribe(() => this.push());

    interval(PULL_INTERVAL_MS).subscribe(() => this.pull());
    timer(INITIAL_PULL_DELAY_MS).subscribe(() => this.pull());

    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'visible') {
        this.pull();
      }
    });
  }

  clearConflict() {
    this.conflictSubject.next(false);
  }

  private canSync(): boolean {
    return !!this.authService.accessToken && !this.syncing;
  }

  private push() {
    if (!this.canSync() || !this.syncMetadata.isDirty()) {
      return;
    }

    this.syncing = true;
    this.adminDbService.getRecentBackupFiles()
      .pipe(
        switchMap(files => {
          const latest = files[0] as DriveFile | undefined;
          if (latest && latest.name !== this.syncMetadata.getLastSyncedBackupName()) {
            this.conflictSubject.next(true);
            return EMPTY;
          }
          return this.adminDbService.export();
        }),
        catchError(error => {
          console.error('Auto-sync push failed', error);
          return EMPTY;
        }),
        finalize(() => this.syncing = false),
      )
      .subscribe();
  }

  private pull() {
    if (!this.canSync()) {
      return;
    }

    this.syncing = true;
    this.adminDbService.getRecentBackupFiles()
      .pipe(
        switchMap(files => {
          const latest = files[0] as DriveFile | undefined;
          if (!latest || latest.name === this.syncMetadata.getLastSyncedBackupName()) {
            return EMPTY;
          }
          if (this.syncMetadata.isDirty()) {
            this.conflictSubject.next(true);
            return EMPTY;
          }
          return this.adminDbService.import(latest);
        }),
        catchError(error => {
          console.error('Auto-sync pull failed', error);
          return EMPTY;
        }),
        finalize(() => this.syncing = false),
      )
      .subscribe();
  }

}
