import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

const LAST_SYNCED_BACKUP_NAME_KEY = 'sync.lastSyncedBackupName';
const DIRTY_KEY = 'sync.dirty';

@Injectable({
  providedIn: 'root',
})
export class SyncMetadataService {

  private readonly dirtyChangeSubject = new Subject<void>();
  readonly dirtyChange$ = this.dirtyChangeSubject.asObservable();

  getLastSyncedBackupName(): string | null {
    return localStorage.getItem(LAST_SYNCED_BACKUP_NAME_KEY);
  }

  setLastSyncedBackupName(name: string) {
    localStorage.setItem(LAST_SYNCED_BACKUP_NAME_KEY, name);
  }

  isDirty(): boolean {
    return localStorage.getItem(DIRTY_KEY) === 'true';
  }

  markDirty() {
    localStorage.setItem(DIRTY_KEY, 'true');
    this.dirtyChangeSubject.next();
  }

  clearDirty() {
    localStorage.removeItem(DIRTY_KEY);
  }

}
