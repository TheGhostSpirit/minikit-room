import { Cosmetic } from 'models/cosmetic';
import { Extractors } from 'models/extractors';

import { extract as fandomExtractor } from 'extractors/fandom';
import { extract as labytoolExtractor } from 'extractors/labytool';

const extractorsMap = new Map<Extractors, (document: Document) => Cosmetic[]>([
  [Extractors.FANDOM, fandomExtractor],
  [Extractors.LABYTOOL, labytoolExtractor],
]);

export const getExtractor = (extractor: Extractors): ((document: Document) => Cosmetic[]) => {
  const selectedExtractor =  extractorsMap.get(extractor);

  if (!selectedExtractor) {
    throw new Error('Unknown extractor');
  }

  return selectedExtractor;
};
