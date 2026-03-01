import { Cosmetic as GenericCosmetic } from '@mkr/shared/labyrinthine';

export interface Cosmetic extends GenericCosmetic {
  found?: boolean;
  selected?: boolean;
}

export type CosmeticIdentifier = Pick<Cosmetic, 'name' | 'type'>;

export class CosmeticUtils {
  static toCosmeticIdentifier(cosmetic: Cosmetic): CosmeticIdentifier {
    return { name: cosmetic.name, type: cosmetic.type };
  }

  static isSameCosmetic(cosmetic1: CosmeticIdentifier | Cosmetic, cosmetic2: CosmeticIdentifier | Cosmetic): boolean {
    return cosmetic1.name === cosmetic2.name && cosmetic1.type === cosmetic2.type;
  }
}
