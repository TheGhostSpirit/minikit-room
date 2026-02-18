import { CosmeticType } from 'models/cosmetic-types';
import { CosmeticGroup } from 'models/cosmetic-groups';

export interface Cosmetic {
  id: string;
  name: string;
  type: CosmeticType;
  group: CosmeticGroup;
  icon: string;
};
