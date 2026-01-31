import { CosmeticType } from 'models/cosmetic-types';

export interface Cosmetic {
  id: string;
  name: string;
  type: CosmeticType;
  source: string;
  icon: string;
  subType: string;
};
