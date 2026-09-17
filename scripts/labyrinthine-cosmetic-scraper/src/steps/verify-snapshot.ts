import { readFile } from 'node:fs/promises';

import { Cosmetic } from '@mkr/shared/labyrinthine';

import { CosmeticIdentity, getCosmeticKey, getSnapshotPath, sortCosmeticIdentities, toCosmeticIdentity } from 'utils';

interface CosmeticDiff {
  added: CosmeticIdentity[];
  removed: CosmeticIdentity[];
  changed: { key: string; before: CosmeticIdentity; after: CosmeticIdentity }[];
}

const diffCosmetics = (previous: CosmeticIdentity[], current: CosmeticIdentity[]): CosmeticDiff => {
  const previousByKey = new Map(previous.map(cosmetic => [getCosmeticKey(cosmetic), cosmetic]));
  const currentByKey = new Map(current.map(cosmetic => [getCosmeticKey(cosmetic), cosmetic]));

  const added = current.filter(cosmetic => !previousByKey.has(getCosmeticKey(cosmetic)));
  const removed = previous.filter(cosmetic => !currentByKey.has(getCosmeticKey(cosmetic)));

  const changed = [...currentByKey.entries()].flatMap(([key, after]) => {
    const before = previousByKey.get(key);
    return before && JSON.stringify(before) !== JSON.stringify(after)
      ? [{ key, before, after }]
      : [];
  });

  return { added, removed, changed };
};

const hasDiff = (diff: CosmeticDiff): boolean =>
  diff.added.length > 0 || diff.removed.length > 0 || diff.changed.length > 0;

export const verifySnapshot = async (cosmetics: Cosmetic[]): Promise<void> => {
  const snapshot: CosmeticIdentity[] = JSON.parse(await readFile(getSnapshotPath(), 'utf-8'));
  const current = sortCosmeticIdentities(cosmetics.map(toCosmeticIdentity));

  const diff = diffCosmetics(snapshot, current);

  if (!hasDiff(diff)) {
    return;
  }

  console.error('Scraped cosmetics no longer match the committed snapshot.');
  if (diff.added.length > 0) {
    console.error('Added:', diff.added);
  }
  if (diff.removed.length > 0) {
    console.error('Removed:', diff.removed);
  }
  if (diff.changed.length > 0) {
    console.error('Changed:', diff.changed);
  }

  throw new Error(
    'Cosmetics snapshot mismatch: review the diff above, run "yarn task:snapshot-labyrinthine", then commit the updated snapshot.'
  );
};
