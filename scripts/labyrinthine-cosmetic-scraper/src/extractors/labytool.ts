import { JSDOM } from 'jsdom';

import { Cosmetic, computeCosmeticId } from '@mkr/shared/labyrinthine';

import { CONFIG } from 'config';

export const extract = (raw: string): Cosmetic[] => {
  const document = new JSDOM(raw).window.document;
  const baseUrl = CONFIG.defaultContext.urlToScrap;
  const itemCardQuery = document.querySelectorAll('div.card');

  const itemCards = [...itemCardQuery];

  const getAbsoluteUrl = (relativeUrl: string): string => {
    return new URL(relativeUrl, baseUrl).href
  };

  return itemCards.map(card => {
    const identity = {
      name: card.children[1].children[0].textContent?.trim(),
      group: card.children[1].children[2].children[1].textContent?.trim(),
      type: card.children[1].children[2].children[0].textContent?.trim(),
      icon: getAbsoluteUrl(card.children[0].getAttribute('src') ?? ''),
    } as Omit<Cosmetic, 'id'>;

    return { id: computeCosmeticId(identity), ...identity } as Cosmetic;
  });
};
