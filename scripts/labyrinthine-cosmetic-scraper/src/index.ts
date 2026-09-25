import { clearExportPath } from 'steps/clear';
import { downloadCosmeticImages } from 'steps/download-images';
import { exportData } from 'steps/export';
import { extractData } from 'steps/extract';
import { fetchCosmeticsPage } from 'steps/fetch';
import { verifySnapshot } from 'steps/verify-snapshot';

(async() => {

  await clearExportPath();

  const cosmeticsPage = await fetchCosmeticsPage();

  const cosmetics = extractData(cosmeticsPage);

  await verifySnapshot(cosmetics);

  await downloadCosmeticImages(cosmetics);

  await exportData(cosmetics);

  return 0;
})();
