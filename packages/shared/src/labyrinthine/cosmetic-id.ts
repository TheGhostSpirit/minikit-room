import { sha256 } from 'js-sha256';

import { Cosmetic } from 'labyrinthine/cosmetic';

export type CosmeticIdentitySource = Pick<Cosmetic, 'name' | 'type' | 'group' | 'icon'>;

const normalizeIconPath = (icon: string): string => icon.split('?')[0].split('#')[0];

export const computeCosmeticId = (cosmetic: CosmeticIdentitySource): string => {
  const key = [cosmetic.name, cosmetic.type, cosmetic.group, normalizeIconPath(cosmetic.icon)].join('::');
  return sha256(key);
};
