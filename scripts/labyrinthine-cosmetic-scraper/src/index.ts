import { clearExportPath } from 'steps/clear';
import { downloadCosmeticImages } from 'steps/download-images';
import { exportData } from 'steps/export';
import { extractData } from 'steps/extract';
import { fetchCosmeticsPage } from 'steps/fetch';

(async() => {

  await clearExportPath();

  const cosmeticsPage = await fetchCosmeticsPage();

  const cosmetics = extractData(cosmeticsPage);

  await downloadCosmeticImages(cosmetics);

  await exportData(cosmetics);

  return 0;
})();
