import { Cosmetic } from '@mkr/shared/labyrinthine';

import { diffCosmeticIdentities, sortCosmeticIdentities, toCosmeticIdentity } from 'models/cosmetic-identity';
import { readSnapshot } from 'steps/read-snapshot';

export const verifySnapshot = async (cosmetics: Cosmetic[]): Promise<void> => {
  const snapshot = await readSnapshot();
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
