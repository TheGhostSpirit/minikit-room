import fetch from 'node-fetch';
import { writeFile, copyFile } from 'node:fs/promises';
import pLimit from 'p-limit';

import { Cosmetic } from '@mkr/shared/labyrinthine';

import { getAssetsPath, getExportPath } from 'utils';

export const downloadCosmeticImages = async (cosmetics: Cosmetic[]): Promise<unknown> => {

  const limit = pLimit(5);
  const downloadCosmeticImage = (cosmetic: Cosmetic) => fetch(cosmetic.icon)
    .then(data => data.arrayBuffer())
    .then(data => writeFile(getExportPath(`${cosmetic.id}.img`), Buffer.from(data)));

  return Promise.all([
    ...cosmetics
      .filter(cosmetic => cosmetic.type !== 'Records')
      .map(cosmetic =>
        limit(() => downloadCosmeticImage(cosmetic))
      ),
    ...cosmetics
      .filter(cosmetic => cosmetic.type === 'Records')
      .map(cosmetic => copyFile(getAssetsPath('disc.png'), getExportPath(`${cosmetic.id}.img`)))
  ]);
};
