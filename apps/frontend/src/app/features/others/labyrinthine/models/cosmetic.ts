import { CosmeticType } from 'app/features/others/labyrinthine/models/cosmetic-types';

export interface Cosmetic {
  id: string;
  name: string;
  type: CosmeticType;
  source: string;
  icon: string;
};
