import fetch from 'node-fetch';

import { CONFIG } from 'config';

export const fetchCosmeticsPage = async () => {
  const response = await fetch(CONFIG.urlToScrap);
  return response.text();
};
