import { writeFile } from 'node:fs/promises';

import { Cosmetic } from '@mkr/shared/labyrinthine';

import { getExportPath } from 'utils';

export const exportData = (cosmetics: Cosmetic[]): Promise<void> => {

  return writeFile(getExportPath('cosmetics.json'), JSON.stringify(cosmetics));
};
