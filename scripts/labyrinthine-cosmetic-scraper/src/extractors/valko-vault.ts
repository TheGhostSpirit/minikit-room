import { Cosmetic, computeCosmeticId } from '@mkr/shared/labyrinthine';
import { CONFIG } from 'config';

const baseUrl = new URL(CONFIG.contexts.valkovault.urlToScrap).origin;

interface ValkoVaultItem {
  kind: string;
  name: string;
  category: string;
  type: string | null;
  imagePath: string;
}

interface ValkoVaultResponse {
  items: ValkoVaultItem[];
}

export const extract = (raw: string): Cosmetic[] => {
  const { items } = JSON.parse(raw) as ValkoVaultResponse;

  return items
    .filter(item => item.kind !== 'blueprint')
    .filter(item => item.category !== 'console-edition')
    .map(item => {
      const identity = {
        name: item.name,
        group: item.category,
        type: item.type,
        icon: new URL(item.imagePath, baseUrl).href,
      } as Omit<Cosmetic, 'id'>;

      return { id: computeCosmeticId(identity), ...identity } as Cosmetic;
    });
};
