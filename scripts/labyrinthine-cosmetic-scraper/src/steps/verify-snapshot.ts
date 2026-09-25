import { Cosmetic } from '@mkr/shared/labyrinthine';

import { diffByKey, sortCosmeticIdentities, toCosmeticSnapshotEntry } from 'models/cosmetic-identity';
import { readSnapshot } from 'steps/read-snapshot';

export const verifySnapshot = async (cosmetics: Cosmetic[]): Promise<void> => {
  const snapshot = await readSnapshot();
  const current = sortCosmeticIdentities(cosmetics.map(toCosmeticSnapshotEntry));

  const { onlyInFirst: removed, onlyInSecond: added } = diffByKey(snapshot, current, entry => entry.id);

  if (added.length === 0 && removed.length === 0) {
    return;
  }

  console.error('Scraped cosmetics no longer match the committed snapshot (build is not reproducible).');
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
