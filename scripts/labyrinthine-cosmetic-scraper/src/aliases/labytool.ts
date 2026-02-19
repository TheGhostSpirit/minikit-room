import { CosmeticGroup, CosmeticType } from '@mkr/shared/labyrinthine';

const groupAliases = new Map<CosmeticGroup, string[]>([]);

const typeAliases = new Map<CosmeticType, string[]>([
  [
    'Records',
    [
      'Disc',
    ],
  ],
  [
    'Head',
    [
      'Hat',
    ],
  ],
]);

export const resolveAliases = { typeAliases, groupAliases };
