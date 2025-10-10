import { inject, Injectable } from '@angular/core';

import { Dexie } from 'dexie';
import { exportDB } from 'dexie-export-import';
import { defer, switchMap } from 'rxjs';

import { DB_INDEXES } from 'app/core/database';
import { GoogleDriveService } from 'app/core/services/google/google-drive.service';

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
        switchMap(blob => this.driveService.uploadFile(blob, 'backup-' + new Date().toISOString()))
      )
      .subscribe();
  }

  import() {
    // STEP 1: list all recent files in drive
    // STEP 2: fetch most recent file content
    // STEP 3: call dexie-ie importInto function
  }

}
