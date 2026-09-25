import { Cosmetic } from '@mkr/shared/labyrinthine';

export type CosmeticIdentity = Pick<Cosmetic, 'name' | 'type' | 'group'>;

export type CosmeticSnapshotEntry = CosmeticIdentity & Pick<Cosmetic, 'id'>;

export interface Diff<T> {
  onlyInFirst: T[];
  onlyInSecond: T[];
}

export const toCosmeticIdentity = ({ name, type, group }: Cosmetic): CosmeticIdentity => ({
  name,
  type,
  group
});

export const toCosmeticSnapshotEntry = (cosmetic: Cosmetic): CosmeticSnapshotEntry => ({
  ...toCosmeticIdentity(cosmetic),
  id: cosmetic.id
});

export const sortCosmeticIdentities = <T extends CosmeticIdentity>(cosmetics: T[]): T[] => {
  const sortKey = (cosmetic: CosmeticIdentity) => `${cosmetic.type}|${cosmetic.name}`;
  return [...cosmetics].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
};

export const getCosmeticKey = (cosmetic: CosmeticIdentity): string =>
  `${cosmetic.type}::${cosmetic.name}::${cosmetic.group}`;

export const diffByKey = <T>(first: T[], second: T[], key: (item: T) => string): Diff<T> => {
  const firstKeys = new Set(first.map(key));
  const secondKeys = new Set(second.map(key));

  return {
    onlyInFirst: first.filter(item => !secondKeys.has(key(item))),
    onlyInSecond: second.filter(item => !firstKeys.has(key(item))),
  };
};

export const diffCosmeticIdentities = (
  first: CosmeticIdentity[],
  second: CosmeticIdentity[]
): Diff<CosmeticIdentity> => diffByKey(first, second, getCosmeticKey);
