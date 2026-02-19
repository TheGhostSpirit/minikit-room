import { CosmeticType } from 'labyrinthine/cosmetic-types';
import { CosmeticGroup } from 'labyrinthine/cosmetic-groups';

export interface Cosmetic {
  id: string;
  name: string;
  type: CosmeticType;
  group: CosmeticGroup;
  icon: string;
};
