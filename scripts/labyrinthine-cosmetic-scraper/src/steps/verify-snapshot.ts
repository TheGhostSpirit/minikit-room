import { readFile } from 'node:fs/promises';

import { Cosmetic } from '@mkr/shared/labyrinthine';

import { CosmeticIdentity, diffCosmeticIdentities, sortCosmeticIdentities, toCosmeticIdentity } from 'models/cosmetic-identity';
import { getSnapshotPath } from 'utils';

export const verifySnapshot = async (cosmetics: Cosmetic[]): Promise<void> => {
  const snapshot: CosmeticIdentity[] = JSON.parse(await readFile(getSnapshotPath(), 'utf-8'));
  const current = sortCosmeticIdentities(cosmetics.map(toCosmeticIdentity));

  const { onlyInFirst: removed, onlyInSecond: added } = diffCosmeticIdentities(snapshot, current);

  if (added.length === 0 && removed.length === 0) {
    return;
  }

  console.error('Scraped cosmetics no longer match the committed snapshot.');
  if (added.length > 0) {
    console.error('Added:', added);
  }
  if (removed.length > 0) {
    console.error('Removed:', removed);
  }

  throw new Error(
    'Cosmetics snapshot mismatch: review the diff above.'
  );
};
