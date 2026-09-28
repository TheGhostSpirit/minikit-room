import { Injectable } from '@angular/core';

import { Metadata } from 'app/core/models/metadata';
import { BaseIndexedDbService } from 'app/core/services/indexed-db/base-indexed-db.service';
import { DB_KEYS } from 'app/core/database';

@Injectable({
  providedIn: 'root',
})
export class MetadataService extends BaseIndexedDbService<Metadata> {
  dbKey: string = DB_KEYS.metadata;
}
