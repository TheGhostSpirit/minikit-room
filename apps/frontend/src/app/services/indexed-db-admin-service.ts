import { inject, Injectable } from '@angular/core';

import { Dexie } from 'dexie';
import { exportDB } from 'dexie-export-import';

import { DB_INDEXES } from 'app/database/indexes';
import { GoogleDriveService } from 'app/services/google-drive-service';

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

  async export() {
    const blob = await exportDB(this.db);
    return this.driveService.uploadFile(
      blob,
      'backup-' + new Date().toISOString()
    );
  }

}
