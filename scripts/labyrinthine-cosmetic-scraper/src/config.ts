import { Extractors } from 'models/extractors';

export const CONFIG = {
  contexts: {
    fandom: {
      urlToScrap: 'https://labyrinthine.fandom.com/api.php?action=parse&page=Customisation&format=json&prop=text',
      extractor: Extractors.FANDOM,
      parseResponse: (raw: string): string => {
        const { parse } = JSON.parse(raw) as { parse?: { text?: Record<string, string> } };
        if (!parse?.text?.['*']) {
          throw new Error('Unexpected MediaWiki API response shape');
        }
        return parse.text['*'];
      },
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
