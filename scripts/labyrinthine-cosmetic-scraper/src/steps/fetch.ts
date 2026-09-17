import fetch from 'node-fetch';

import { CONFIG } from 'config';
import { Context } from 'models/context';

export const fetchCosmeticsPage = async (context: Context = CONFIG.defaultContext): Promise<string> => {
  const response = await fetch(context.urlToScrap);
  return response.text();
};
