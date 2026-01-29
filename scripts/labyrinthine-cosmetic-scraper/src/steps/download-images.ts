import fetch from 'node-fetch';
import { writeFile } from 'node:fs/promises';

import { Cosmetic } from 'models/cosmetic';
import { getExportPath } from 'utils';

export const downloadCosmeticImages = async (cosmetics: Cosmetic[]): Promise<unknown> => {
  
  return Promise.all(
    cosmetics
      .filter(cosmetic => !!cosmetic.icon)
      .map(cosmetic =>
        fetch(cosmetic.icon)
          .then(data => data.arrayBuffer())
          .then(data => writeFile(getExportPath(`${cosmetic.id}.img`), Buffer.from(data)))
      )
  );
};
 