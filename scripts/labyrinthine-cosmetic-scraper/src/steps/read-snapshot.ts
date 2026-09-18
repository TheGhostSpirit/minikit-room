import { readFile } from 'node:fs/promises';

import { CosmeticIdentity } from 'models/cosmetic-identity';
import { getSnapshotPath } from 'utils';

export const readSnapshot = async (): Promise<CosmeticIdentity[]> => {
  const raw = await readFile(getSnapshotPath(), 'utf-8');
  return JSON.parse(raw) as CosmeticIdentity[];
};
