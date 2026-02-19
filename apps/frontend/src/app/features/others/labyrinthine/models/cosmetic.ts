import { Cosmetic as GenericCosmetic } from '@mkr/shared/labyrinthine';

export interface Cosmetic extends GenericCosmetic {
  found?: boolean;
  selected?: boolean;
}
