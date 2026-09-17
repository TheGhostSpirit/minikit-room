import { Extractors } from 'models/extractors';

export interface Context {
  urlToScrap: string;
  extractor: Extractors;
}
