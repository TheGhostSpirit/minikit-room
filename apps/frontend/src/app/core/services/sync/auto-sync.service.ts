import { inject, Injectable } from '@angular/core';

import { BehaviorSubject, EMPTY, interval, timer } from 'rxjs';
import { catchError, debounceTime, finalize, switchMap, tap } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

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
  private readonly messageService = inject(MessageService);

  private readonly conflictSubject = new BehaviorSubject<boolean>(false);
  readonly conflict$ = this.conflictSubject.asObservable();

  private readonly syncingSubject = new BehaviorSubject<boolean>(false);
  readonly syncing$ = this.syncingSubject.asObservable();

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

  private raiseConflict() {
    if (!this.conflictSubject.value) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Conflit de synchronisation',
        detail: 'Les données locales et distantes ont divergé. Importez ou exportez manuellement pour résoudre le conflit.',
      });
    }
    this.conflictSubject.next(true);
  }

  private canSync(): boolean {
    return !!this.authService.accessToken && !this.syncingSubject.value;
  }

  private log(message: string, ...args: unknown[]) {
    console.log(`[AutoSync] ${new Date().toLocaleTimeString()} ${message}`, ...args);
  }

  private push() {
    if (!this.canSync()) {
      this.log('push skipped: not allowed (no token or already syncing)');
      return;
    }
    if (!this.syncMetadata.isDirty()) {
      this.log('push skipped: nothing dirty');
      return;
    }

    this.log('push started');
    this.syncingSubject.next(true);
    this.adminDbService.getRecentBackupFiles()
      .pipe(
        switchMap(files => {
          const latest = files[0] as DriveFile | undefined;
          if (latest && latest.name !== this.syncMetadata.getLastSyncedBackupName()) {
            this.log('push aborted: conflict detected, remote moved to', latest.name);
            this.raiseConflict();
            return EMPTY;
          }
          return this.adminDbService.export();
        }),
        tap(() => this.log('push finished: backup uploaded')),
        catchError(error => {
          console.error('[AutoSync] push failed', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Échec de la synchronisation',
            detail: 'L\'export automatique vers Google Drive a échoué.',
          });
          return EMPTY;
        }),
        finalize(() => this.syncingSubject.next(false)),
      )
      .subscribe();
  }

  private pull() {
    if (!this.canSync()) {
      this.log('pull skipped: not allowed (no token or already syncing)');
      return;
    }

    this.log('pull started');
    this.syncingSubject.next(true);
    this.adminDbService.getRecentBackupFiles()
      .pipe(
        switchMap(files => {
          const latest = files[0] as DriveFile | undefined;
          if (!latest || latest.name === this.syncMetadata.getLastSyncedBackupName()) {
            this.log('pull finished: no newer remote backup');
            return EMPTY;
          }
          if (this.syncMetadata.isDirty()) {
            this.log('pull aborted: conflict detected, local dirty and remote moved to', latest.name);
            this.raiseConflict();
            return EMPTY;
          }
          this.log('pull applying remote backup', latest.name);
          return this.adminDbService.import(latest);
        }),
        tap(() => this.log('pull finished: local data updated')),
        catchError(error => {
          console.error('[AutoSync] pull failed', error);
          this.messageService.add({
            severity: 'error',
            summary: 'Échec de la synchronisation',
            detail: 'L\'import automatique depuis Google Drive a échoué.',
          });
          return EMPTY;
        }),
        finalize(() => this.syncingSubject.next(false)),
      )
      .subscribe();
  }

}
