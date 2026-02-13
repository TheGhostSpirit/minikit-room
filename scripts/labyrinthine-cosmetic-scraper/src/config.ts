import { Extractors } from 'models/extractors';

export const CONFIG = {
  urlToScrap: 'https://labyrinthine.fandom.com/wiki/Customisation',
  exportPath: process.env.EXPORT_PATH,
  debug: false,
  defaultExtractor: Extractors.FANDOM,
};
