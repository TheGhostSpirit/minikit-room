import { Cosmetic as GenericCosmetic, computeCosmeticId } from '@mkr/shared/labyrinthine';

export interface Cosmetic extends GenericCosmetic {
  found?: boolean;
  selected?: boolean;
}

export type CosmeticIdentifier = Pick<Cosmetic, 'name' | 'type' | 'group' | 'icon'>;

export class CosmeticUtils {
  static toCosmeticIdentifier(cosmetic: Cosmetic): CosmeticIdentifier {
    const { name, type, group, icon } = cosmetic;
    return { name, type, group, icon };
  }

  static isSameCosmetic(cosmetic1: CosmeticIdentifier | Cosmetic, cosmetic2: CosmeticIdentifier | Cosmetic): boolean {
    return computeCosmeticId(cosmetic1) === computeCosmeticId(cosmetic2);
  }
}
