import { inject, Injectable } from '@angular/core';

import { Dexie } from 'dexie';
import { exportDB, importInto } from 'dexie-export-import';
import { BehaviorSubject, defer, forkJoin, iif, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';

import { DB_INDEXES } from 'app/core/database';
import { GoogleDriveService } from 'app/core/services/google/google-drive.service';
import { BlobCompressionService } from 'app/shared/services/blob-compression.service';
import { DriveFile, getMostRecentBackupFiles, getNewBackupFileName } from 'app/core/models/drive-file';
import { ImportState } from 'app/core/models/import-state';
import { ExportState } from 'app/core/models/export-state';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbAdminService {

  private readonly db = new Dexie(environment.database.name);
  private readonly driveService = inject(GoogleDriveService);
  private readonly blobCompressionService = inject(BlobCompressionService);

  private readonly importState = new BehaviorSubject<ImportState>(ImportState.NOT_IMPORTING);
  private readonly exportState = new BehaviorSubject<ExportState>(ExportState.NOT_EXPORTING);

  constructor() {
    this.db.version(1).stores(DB_INDEXES);
  }

  export() {
    this.exportState.next(ExportState.EXPORTING);
    return forkJoin([
      this.driveService.findFolder(environment.drive.folderName)
        .pipe(
          switchMap(folder => iif(
            () => !folder,
            this.driveService.createFolder(environment.drive.folderName),
            of((folder as DriveFile)?.id)
          )),
        ),
      defer(() => exportDB(this.db))
        .pipe(
          tap(() => this.exportState.next(ExportState.COMPRESSING)),
          switchMap(blob => this.blobCompressionService.compress(blob)),
        ),
    ]).pipe(
      tap(() => this.exportState.next(ExportState.UPLOADING)),
      switchMap(([folderId, blob])  => this.driveService.uploadFile(blob, getNewBackupFileName(), folderId)),
      tap(() => this.exportState.next(ExportState.FINISHED)),
    );
  }

  import(fileToImport: DriveFile) {
    this.importState.next(ImportState.DOWNLOADING);
    return this.driveService.downloadFile(fileToImport.id)
      .pipe(
        tap(() => this.importState.next(ImportState.DECOMPRESSING)),
        switchMap((blob) => this.blobCompressionService.decompress(blob)),
        tap(() => this.importState.next(ImportState.IMPORTING)),
        switchMap((blob) => defer(() => importInto(this.db, blob, { overwriteValues: true }))),
        tap(() => this.importState.next(ImportState.FINISHED)),
      );
  }

  getRecentBackupFiles(): Observable<DriveFile[]> {
    return this.driveService.findFolder(environment.drive.folderName)
      .pipe(
        switchMap(driveFile => this.driveService.listFilesInFolder((driveFile as DriveFile)?.id)),
        map(files => getMostRecentBackupFiles(files)),
      );
  }

  getImportState() {
    return this.importState.asObservable();
  }

  getExportState() {
    return this.exportState.asObservable();
  }

}
