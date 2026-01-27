import { exportData } from 'steps/export';
import { extractData } from 'steps/extract';
import { fetchCosmeticsPage } from 'steps/fetch';

(async() => {

  const cosmeticsPage = await fetchCosmeticsPage();

  const data = extractData(cosmeticsPage);

  await exportData(data);

  return 0;
})();
