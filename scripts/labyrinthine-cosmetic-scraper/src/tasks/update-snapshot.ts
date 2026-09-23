import { writeFile } from 'node:fs/promises';

import { scrapeCosmeticSnapshotEntries } from 'steps/scrape-identities';
import { getSnapshotPath } from 'utils';

(async() => {

  const snapshot = await scrapeCosmeticSnapshotEntries();

  const snapshotPath = getSnapshotPath();
  await writeFile(snapshotPath, JSON.stringify(snapshot, null, 2));

  return 0;
})();
