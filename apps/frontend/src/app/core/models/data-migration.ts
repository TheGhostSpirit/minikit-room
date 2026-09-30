import { Metadata } from 'app/core/models/metadata';
import { DB_KEYS } from 'app/core/database';

export interface DataMigration {
  metadata: Omit<Metadata, 'id'>;
  target: keyof typeof DB_KEYS;
  /**
   * Dot-separated key path, inside each row, of the value to update (e.g. `cosmetics`).
   * If it points to an array, each matching element is replaced by `to`; otherwise the value itself is.
   * Without a path, `to` is merged into each matching row.
   */
  path?: string;
  update: {
    from: object;
    to: object;
  }[];
}
