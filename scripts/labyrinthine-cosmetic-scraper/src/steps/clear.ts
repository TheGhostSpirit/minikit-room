import { readdir, unlink } from 'node:fs/promises';

import { getExportPath } from 'utils';

export const clearExportPath = async() => {
  const exportPath = getExportPath();

  const entries = await readdir(exportPath, { withFileTypes: true });

  return Promise.all(
    entries
      .filter(entry =>
        entry.isFile() && !entry.name.startsWith('.')
      )
      .map(entry =>
        unlink(getExportPath(entry.name))
      )
  );
};


