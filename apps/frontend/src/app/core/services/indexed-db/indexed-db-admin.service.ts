import { inject, Injectable } from '@angular/core';

import { Dexie } from 'dexie';
import { exportDB, importInto } from 'dexie-export-import';
import { BehaviorSubject, defer } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { DB_INDEXES } from 'app/core/database';
import { GoogleDriveService } from 'app/core/services/google/google-drive.service';
import { getBackupFiles, getMostRecentBackupFile, getNewBackupFileName } from 'app/core/models/drive-file';
import { ImportState } from 'app/core/models/import-state';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbAdminService {

  private readonly db = new Dexie(environment.database.name);
  private readonly driveService = inject(GoogleDriveService);

  private readonly importState = new BehaviorSubject<ImportState>(ImportState.NOT_IMPORTING);

  constructor() {
    this.db.version(1).stores(DB_INDEXES);
  }

  export() {
    defer(() => exportDB(this.db))
      .pipe(
        switchMap(blob => this.driveService.uploadFile(blob, getNewBackupFileName()))
      )
      .subscribe();
  }

  import() {
    return this.driveService.listFiles()
      .pipe(
        tap(() => this.importState.next(ImportState.NOT_IMPORTING)),
        map(files => {
          const backupFiles = getBackupFiles(files);
          const newestBackupFile = getMostRecentBackupFile(backupFiles);
          return newestBackupFile;
        }),
        tap(() => this.importState.next(ImportState.DOWNLOADING)),
        switchMap((file) => this.driveService.downloadFile(file.id)),
        tap(() => this.importState.next(ImportState.IMPORTING)),
        switchMap((blob) => defer(() => importInto(this.db, blob, { overwriteValues: true }))),
        tap(() => this.importState.next(ImportState.FINISHED)),
      );
  }

  getImportState() {
    return this.importState.asObservable();
  }

}
