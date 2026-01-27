import { JSDOM } from 'jsdom';

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

export const extractData = (html: string): Cosmetic[] => {

  const document = getDOM(html);
  const tableRowsQuery = document.querySelector('#tpt-1 tbody');

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
      id: row.children[4].textContent.trim(),
      type: row.children[3].textContent.trim(),
      source: row.children[5].textContent.trim(),
      icon: row.children[1].children[0].children[0].getAttribute('href'),
    } as Cosmetic;
  });
};
