import path from 'node:path';

import { CONFIG } from 'config';

export const getExportPath = (fileName: string): string => {
  return path.join(process.cwd(), '..', '..', CONFIG.exportPath ?? '', fileName);
};

export const getAssetsPath = (fileName: string): string => {
  return path.join(process.cwd(), 'assets', fileName);
};
