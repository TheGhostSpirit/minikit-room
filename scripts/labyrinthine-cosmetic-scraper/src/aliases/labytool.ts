import { CosmeticGroup, CosmeticType } from '@mkr/shared';

const groupAliases = new Map<CosmeticGroup, string[]>([]);

const typeAliases = new Map<CosmeticType, string[]>([]);

export const resolveAliases = { typeAliases, groupAliases };
