import { CosmeticGroup, CosmeticType } from '@mkr/shared/labyrinthine';

const groupAliases = new Map<CosmeticGroup, string[]>([]);

const typeAliases = new Map<CosmeticType, string[]>([]);

export const resolveAliases = { typeAliases, groupAliases };
