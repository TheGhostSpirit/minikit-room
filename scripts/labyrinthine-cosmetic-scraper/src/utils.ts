import path from 'node:path';

import { Cosmetic } from '@mkr/shared/labyrinthine';

import { CONFIG } from 'config';

export const getExportPath = (fileName?: string): string => {
  return path.join(process.cwd(), '..', '..', CONFIG.exportPath ?? '', fileName ?? '');
};

export const getAssetsPath = (fileName: string): string => {
  return path.join(process.cwd(), 'assets', fileName);
};

export const getSnapshotPath = (): string => {
  return path.join(process.cwd(), 'snapshot', 'cosmetics.json');
};

export type CosmeticIdentity = Pick<Cosmetic, 'name' | 'type'>;

export const toCosmeticIdentity = ({ name, type }: Cosmetic): CosmeticIdentity => ({
  name,
  type
});

export const sortCosmeticIdentities = <T extends CosmeticIdentity>(cosmetics: T[]): T[] => {
  const sortKey = (cosmetic: CosmeticIdentity) => `${cosmetic.type}|${cosmetic.name}`;
  return [...cosmetics].sort((a, b) => sortKey(a).localeCompare(sortKey(b)));
};

// Mirrors the frontend's CosmeticIdentifier (name + type) — apps/frontend/.../models/cosmetic.ts
export const getCosmeticKey = (cosmetic: Pick<CosmeticIdentity, 'name' | 'type'>): string =>
  `${cosmetic.type}::${cosmetic.name}`;
