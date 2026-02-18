import { JSDOM } from 'jsdom';

import { CONFIG } from 'config';
import { Cosmetic } from 'models/cosmetic';
import { getExtractor } from 'extractors';
import { resolveAliases } from 'aliases';

export const extractData = (html: string): Cosmetic[] => {
  const getDOM = (html: string): Document => {
    const dom = new JSDOM(html);
    return dom.window.document;
  };

  const document = getDOM(html);

  const cosmetics = getExtractor(CONFIG.defaultExtractor)(document);
  return resolveAliases(cosmetics, CONFIG.defaultExtractor);
};
