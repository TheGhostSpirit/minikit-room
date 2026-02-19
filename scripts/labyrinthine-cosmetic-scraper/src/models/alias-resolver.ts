import { CosmeticGroup, CosmeticType } from '@mkr/shared/labyrinthine';

export type AliasResolver = {
  groupAliases: Map<CosmeticGroup, string[]>;
  typeAliases: Map<CosmeticType, string[]>;
};
