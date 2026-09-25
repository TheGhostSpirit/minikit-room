import { Cosmetic, CosmeticIdentifier, CosmeticUtils } from 'app/features/others/labyrinthine/models/cosmetic';

export interface Commit {
  id?: number;
  date: string;
  cosmetics: CosmeticIdentifier[];
}

export const createCommit = (cosmetics: Cosmetic[]): Commit => {
  return {
    date: new Date().toISOString(),
    cosmetics: cosmetics.map(cosmetic => CosmeticUtils.toCosmeticIdentifier(cosmetic))
  } as Commit;
};
