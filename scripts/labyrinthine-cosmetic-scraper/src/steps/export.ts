import { writeFile } from 'node:fs/promises';
import path from 'node:path';

import { CONFIG } from 'config';
import { Cosmetic } from 'models/cosmetic';

export const exportData = (cosmetics: Cosmetic[]): Promise<void> => {
  const exportPath = path.join(process.cwd(), '..', '..', CONFIG.exportPath ?? '', 'cosmetics.json');

  return writeFile(exportPath, JSON.stringify(cosmetics));
};
