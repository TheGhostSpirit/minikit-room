import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs';

const LAST_SYNCED_BACKUP_NAME_KEY = 'sync.lastSyncedBackupName';
const DIRTY_KEY = 'sync.dirty';

@Injectable({
  providedIn: 'root',
})
export class SyncMetadataService {

  private readonly dirtySubject = new BehaviorSubject<boolean>(this.isDirty());
  readonly dirty$ = this.dirtySubject.asObservable();

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
    this.dirtySubject.next(true);
  }

  clearDirty() {
    localStorage.removeItem(DIRTY_KEY);
    this.dirtySubject.next(false);
  }

}
