import { CosmeticType } from 'app/features/others/labyrinthine/models/cosmetic-types';

export interface Cosmetic {
  id: string;
  name: string;
  type: CosmeticType;
  group: string;
  icon: string;
  found?: boolean;
  selected?: boolean;
}
