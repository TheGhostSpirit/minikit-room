import { JSDOM } from 'jsdom';
import { v4 as uuid } from 'uuid';

import { CONFIG } from 'config';
import { Cosmetic } from 'models/cosmetic';

const debugTree = (rootElement: Element): void => {
  const print = (e: Element, depth: number) => {
    const indentSize = '  ';
    const indent = indentSize.repeat(depth);
    console.log(indent + e.tagName);

    const children = [...e.children];
    children.forEach(c => print(c, depth + 1));
  };
  print(rootElement, 0);
};

const getDOM = (html: string): Document => {
  const dom = new JSDOM(html);
  return dom.window.document;
};

const extractTable = (document: Document, querySelector: string, cosmeticType: string): Cosmetic[] => {
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
      subType: row.children[3].textContent.trim(),
      source: row.children[5].textContent.trim(),
      // TODO rework
      icon: row?.children[1]?.children[0]?.children[0]?.getAttribute('href') ?? '',
      type: cosmeticType,
    } as Cosmetic;
  });
}

export const extractData = (html: string): Cosmetic[] => {

  const document = getDOM(html);

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
