import { readFile } from 'node:fs/promises';

import { CosmeticSnapshotEntry } from 'models/cosmetic-identity';
import { getSnapshotPath } from 'utils';

export const readSnapshot = async (): Promise<CosmeticSnapshotEntry[]> => {
  const raw = await readFile(getSnapshotPath(), 'utf-8');
  return JSON.parse(raw) as CosmeticSnapshotEntry[];
};
