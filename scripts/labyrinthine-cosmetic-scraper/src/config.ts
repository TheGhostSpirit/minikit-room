import { Extractors } from 'models/extractors';

export const CONFIG = {
  contexts: {
    fandom: {
      urlToScrap: 'https://labyrinthine.fandom.com/wiki/Customisation',
      extractor: Extractors.FANDOM,
    },
    labytool: {
      urlToScrap: 'https://labyrinthinetool.de/cosmetics-all',
      extractor: Extractors.LABYTOOL,
    }
  },
  exportPath: process.env.EXPORT_PATH,
  debug: false,
  get defaultContext() {
    return this.contexts.labytool;
  },
};
