import { CosmeticGroup } from 'models/cosmetic-groups';
import { CosmeticType } from 'models/cosmetic-types';

export type AliasResolver = {
  groupAliases: Map<CosmeticGroup, string[]>;
  typeAliases: Map<CosmeticType, string[]>;
};
