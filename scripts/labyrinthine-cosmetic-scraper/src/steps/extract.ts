import { JSDOM } from 'jsdom';

import { Cosmetic } from '@mkr/shared/labyrinthine';

import { CONFIG } from 'config';
import { getExtractor } from 'extractors';
import { resolveAliases } from 'aliases';

export const extractData = (html: string): Cosmetic[] => {
  const getDOM = (html: string): Document => {
    const dom = new JSDOM(html);
    return dom.window.document;
  };

  const document = getDOM(html);

  const cosmetics = getExtractor(CONFIG.defaultContext.extractor)(document);
  return resolveAliases(cosmetics, CONFIG.defaultContext.extractor);
};
