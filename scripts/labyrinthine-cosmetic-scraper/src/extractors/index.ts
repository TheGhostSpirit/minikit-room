import { Cosmetic } from '@mkr/shared/labyrinthine';

import { Extractors } from 'models/extractors';

import { extract as fandomExtractor } from 'extractors/fandom';
import { extract as labytoolExtractor } from 'extractors/labytool';
import { extract as valkoVaultExtractor } from 'extractors/valko-vault';

const extractorsMap = new Map<Extractors, (raw: string) => Cosmetic[]>([
  [Extractors.FANDOM, fandomExtractor],
  [Extractors.LABYTOOL, labytoolExtractor],
  [Extractors.VALKOVAULT, valkoVaultExtractor],
]);

export const getExtractor = (extractor: Extractors): ((raw: string) => Cosmetic[]) => {
  const selectedExtractor =  extractorsMap.get(extractor);

  if (!selectedExtractor) {
    throw new Error('Unknown extractor');
  }

  return selectedExtractor;
};
