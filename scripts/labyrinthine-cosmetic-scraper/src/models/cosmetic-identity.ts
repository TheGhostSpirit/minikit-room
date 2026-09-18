import { Cosmetic } from '@mkr/shared/labyrinthine';

export type CosmeticIdentity = Pick<Cosmetic, 'name' | 'type'>;

export interface CosmeticIdentityDiff {
  onlyInFirst: CosmeticIdentity[];
  onlyInSecond: CosmeticIdentity[];
}

export const toCosmeticIdentity = ({ name, type }: Cosmetic): CosmeticIdentity => ({
  name,
  type
});

export const sortCosmeticIdentities = <T extends CosmeticIdentity>(cosmetics: T[]): T[] => {
  const sortKey = (cosmetic: CosmeticIdentity) => `${cosmetic.type}|${cosmetic.name}`;
  return [...cosmetics].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
};

export const getCosmeticKey = (cosmetic: Pick<CosmeticIdentity, 'name' | 'type'>): string =>
  `${cosmetic.type}::${cosmetic.name}`;

export const diffCosmeticIdentities = (
  first: CosmeticIdentity[],
  second: CosmeticIdentity[]
): CosmeticIdentityDiff => {
  const firstKeys = new Set(first.map(getCosmeticKey));
  const secondKeys = new Set(second.map(getCosmeticKey));

  return {
    onlyInFirst: first.filter(cosmetic => !secondKeys.has(getCosmeticKey(cosmetic))),
    onlyInSecond: second.filter(cosmetic => !firstKeys.has(getCosmeticKey(cosmetic))),
  };
};
