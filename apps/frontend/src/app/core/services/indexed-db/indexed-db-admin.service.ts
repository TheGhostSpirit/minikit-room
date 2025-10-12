import { inject, Injectable } from '@angular/core';

import { Dexie } from 'dexie';
import { exportDB, importInto } from 'dexie-export-import';
import { defer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { DB_INDEXES } from 'app/core/database';
import { GoogleDriveService } from 'app/core/services/google/google-drive.service';
import { getBackupFiles, getMostRecentBackupFile, getNewBackupFileName } from 'app/core/models/drive-file';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbAdminService {

  private readonly db = new Dexie(environment.database.name);
  private readonly driveService = inject(GoogleDriveService);

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
    this.driveService.listFiles()
      .pipe(
        map(files => {
          const backupFiles = getBackupFiles(files);
          const newestBackupFile = getMostRecentBackupFile(backupFiles);
          return newestBackupFile;
        }),
        switchMap((file) => this.driveService.downloadFile(file.id)),
        switchMap((blob) => defer(() => importInto(this.db, blob, { overwriteValues: true }))),
      )
      .subscribe();
  }

}
