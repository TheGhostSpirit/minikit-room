import { writeFile } from 'node:fs/promises';

import { extractData } from 'steps/extract';
import { fetchCosmeticsPage } from 'steps/fetch';
import { getSnapshotPath, sortCosmeticIdentities, toCosmeticIdentity } from 'utils';

(async() => {

  const cosmeticsPage = await fetchCosmeticsPage();

  const cosmetics = extractData(cosmeticsPage);

  const snapshot = sortCosmeticIdentities(cosmetics.map(toCosmeticIdentity));

  const snapshotPath = getSnapshotPath();
  await writeFile(snapshotPath, JSON.stringify(snapshot, null, 2));

  return 0;
})();
