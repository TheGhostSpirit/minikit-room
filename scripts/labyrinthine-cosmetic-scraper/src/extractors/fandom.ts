import { v4 as uuid } from 'uuid';

import { CONFIG } from 'config';
import { Cosmetic } from 'models/cosmetic';
import { CosmeticType } from 'models/cosmetic-types';
import { debugTree } from 'extractors/utils';

export const extract = (document: Document): Cosmetic[] => {
  return [
    ...extractTable(document, '#tpt-1 tbody', 'Head'),
    ...extractTable(document, '#tpt-2 tbody', 'Clothing'),
    ...extractTable(document, '#tpt-3 tbody', 'Wrist'),
    ...extractTable(document, '#tpt-4 tbody', 'Flashlight'),
    ...extractTable(document, '#tpt-5 tbody', 'Lantern'),
    ...extractTable(document, '#tpt-6 tbody', 'Glowsticks'),
    ...extractTable(document, '#tpt-7 tbody', 'Face'),
    ...extractTable(document, '#tpt-8 tbody', 'Records'),
  ];
};

const extractTable = (document: Document, querySelector: string, cosmeticType: CosmeticType): Cosmetic[] => {
  const tableRowsQuery = document.querySelector(querySelector);

  if (!tableRowsQuery) {
    throw new Error('Invalid page structure');
  }

  if (CONFIG.debug) {
    debugTree(tableRowsQuery);
  }

  const removeHeaderRow = (rows: Element[]) => {
    return rows.slice(1);
  };

  const tableRows = removeHeaderRow([...tableRowsQuery.children]);
  return tableRows.map(row => {
    return {
      id: uuid(),
      name: row.children[4].textContent.trim(),
      source: row.children[5].textContent.trim(),
      type: cosmeticType,
      icon: cosmeticType === 'Records'
        ? ''
        : row.children[1].children[0].children[0].getAttribute('href'),
    } as Cosmetic;
  });
};
