import { CosmeticType } from 'app/features/others/labyrinthine/models/cosmetic-types';
import { CosmeticGroup } from 'app/features/others/labyrinthine/models/cosmetic-groups';

export interface Cosmetic {
  id: string;
  name: string;
  type: CosmeticType;
  group: CosmeticGroup;
  icon: string;
  found?: boolean;
  selected?: boolean;
}
