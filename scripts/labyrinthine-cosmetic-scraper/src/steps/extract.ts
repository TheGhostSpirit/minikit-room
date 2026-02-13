import { JSDOM } from 'jsdom';

import { CONFIG } from 'config';
import { Cosmetic } from 'models/cosmetic';
import { getExtractor } from 'extractors';

export const debugTree = (rootElement: Element): void => {
  const print = (e: Element, depth: number) => {
    const indentSize = '  ';
    const indent = indentSize.repeat(depth);
    console.log(indent + e.tagName);

    const children = [...e.children];
    children.forEach(c => print(c, depth + 1));
  };
  print(rootElement, 0);
};

export const extractData = (html: string): Cosmetic[] => {
  const getDOM = (html: string): Document => {
    const dom = new JSDOM(html);
    return dom.window.document;
  };

  const document = getDOM(html);

  return getExtractor(CONFIG.defaultExtractor)(document);
};
