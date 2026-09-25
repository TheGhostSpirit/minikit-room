import { Cosmetic as GenericCosmetic } from '@mkr/shared/labyrinthine';

export interface Cosmetic extends GenericCosmetic {
  found?: boolean;
  selected?: boolean;
}

export type CosmeticIdentifier = Pick<Cosmetic, 'id'>;

export class CosmeticUtils {
  static toCosmeticIdentifier(cosmetic: Cosmetic): CosmeticIdentifier {
    return { id: cosmetic.id };
  }

  static isSameCosmetic(cosmetic1: CosmeticIdentifier | Cosmetic, cosmetic2: CosmeticIdentifier | Cosmetic): boolean {
    return cosmetic1.id === cosmetic2.id;
  }
}
