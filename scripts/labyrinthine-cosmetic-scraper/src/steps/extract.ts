import { Cosmetic } from '@mkr/shared/labyrinthine';

import { CONFIG } from 'config';
import { getExtractor } from 'extractors';
import { resolveAliases } from 'aliases';
import { Context } from 'models/context';

export const extractData = (raw: string, context: Context = CONFIG.defaultContext): Cosmetic[] => {
  const cosmetics = getExtractor(context.extractor)(raw);
  return resolveAliases(cosmetics, context.extractor);
};
