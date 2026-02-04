import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';

export interface Commit {
  id?: number;
  date: string;
  cosmetics: {
    name: string;
    type: string;
  }[];
}

export const createCommit = (cosmetics: Cosmetic[]): Commit => {
  return {
    date: new Date().toISOString(),
    cosmetics: cosmetics.map(cosmetic => ({ name: cosmetic.name, type: cosmetic.type }))
  } as Commit;
};
