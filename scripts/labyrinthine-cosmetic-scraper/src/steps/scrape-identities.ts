import { CONFIG } from 'config';
import { Context } from 'models/context';
import { CosmeticIdentity, sortCosmeticIdentities, toCosmeticIdentity } from 'models/cosmetic-identity';
import { extractData } from 'steps/extract';
import { fetchCosmeticsPage } from 'steps/fetch';

export const scrapeCosmeticIdentities = async (
  context: Context = CONFIG.defaultContext
): Promise<CosmeticIdentity[]> => {
  const page = await fetchCosmeticsPage(context);
  const cosmetics = extractData(page, context);
  return sortCosmeticIdentities(cosmetics.map(toCosmeticIdentity));
};
