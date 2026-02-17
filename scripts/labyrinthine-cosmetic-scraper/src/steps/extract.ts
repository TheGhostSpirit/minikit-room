import { JSDOM } from 'jsdom';

import { CONFIG } from 'config';
import { Cosmetic } from 'models/cosmetic';
import { getExtractor } from 'extractors';

export const extractData = (html: string): Cosmetic[] => {
  const getDOM = (html: string): Document => {
    const dom = new JSDOM(html);
    return dom.window.document;
  };

  const document = getDOM(html);

  return getExtractor(CONFIG.defaultExtractor)(document);
};
