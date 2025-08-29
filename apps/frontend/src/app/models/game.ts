export const PLATFORMS = ['Xbox', 'PlayStation', 'PC'] as const;

export const FORMATS = ['Physique', 'Dématérialisé'] as const;

export interface Game {
  id: number;
  name: string;
  rating: number;
  platform: typeof PLATFORMS[number];
  format: typeof FORMATS[number];
  studio: string;
  summary: string;
  comment: string;
}
