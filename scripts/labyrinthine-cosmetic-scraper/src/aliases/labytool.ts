import { CosmeticGroup } from 'models/cosmetic-groups';
import { CosmeticType } from 'models/cosmetic-types';

const groupAliases = new Map<CosmeticGroup, string[]>([]);

const typeAliases = new Map<CosmeticType, string[]>([]);

export const resolveAliases = { typeAliases, groupAliases };
