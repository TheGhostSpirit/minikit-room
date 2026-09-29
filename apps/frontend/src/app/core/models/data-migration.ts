import { Metadata } from 'app/core/models/metadata';
import { DB_KEYS } from 'app/core/database';

export interface DataMigration {
  metadata: Omit<Metadata, 'id'>;
  target: keyof typeof DB_KEYS;
  update: {
    from: object;
    to: object;
  }[];
}
