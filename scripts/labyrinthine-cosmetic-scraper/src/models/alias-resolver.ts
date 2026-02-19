import { CosmeticGroup, CosmeticType } from '@mkr/shared';

export type AliasResolver = {
  groupAliases: Map<CosmeticGroup, string[]>;
  typeAliases: Map<CosmeticType, string[]>;
};
