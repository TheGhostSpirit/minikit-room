import { writeFile } from 'node:fs/promises';

import { scrapeCosmeticIdentities } from 'steps/scrape-identities';
import { getSnapshotPath } from 'utils';

(async() => {

  const snapshot = await scrapeCosmeticIdentities();

  const snapshotPath = getSnapshotPath();
  await writeFile(snapshotPath, JSON.stringify(snapshot, null, 2));

  return 0;
})();
