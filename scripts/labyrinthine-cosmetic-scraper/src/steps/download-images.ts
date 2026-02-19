import fetch from 'node-fetch';
import { writeFile, copyFile } from 'node:fs/promises';

import { Cosmetic } from '@mkr/shared/labyrinthine';

import { getAssetsPath, getExportPath } from 'utils';

export const downloadCosmeticImages = async (cosmetics: Cosmetic[]): Promise<unknown> => {
  
  return Promise.all([
    ...cosmetics
      .filter(cosmetic => cosmetic.type !== 'Records')
      .map(cosmetic =>
        fetch(cosmetic.icon)
          .then(data => data.arrayBuffer())
          .then(data => writeFile(getExportPath(`${cosmetic.id}.img`), Buffer.from(data)))
      ),
    ...cosmetics
      .filter(cosmetic => cosmetic.type === 'Records')
      .map(cosmetic => copyFile(getAssetsPath('disc.png'), getExportPath(`${cosmetic.id}.img`)))
  ]);
};
 