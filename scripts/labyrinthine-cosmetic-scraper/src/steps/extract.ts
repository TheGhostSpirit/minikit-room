import { JSDOM } from 'jsdom';

import { Cosmetic } from '@mkr/shared/labyrinthine';

import { CONFIG } from 'config';
import { getExtractor } from 'extractors';
import { resolveAliases } from 'aliases';
import { Context } from 'models/context';

export const extractData = (html: string, context: Context = CONFIG.defaultContext): Cosmetic[] => {
  const getDOM = (html: string): Document => {
    const dom = new JSDOM(html);
    return dom.window.document;
  };

  const document = getDOM(html);

  const cosmetics = getExtractor(context.extractor)(document);
  return resolveAliases(cosmetics, context.extractor);
};
