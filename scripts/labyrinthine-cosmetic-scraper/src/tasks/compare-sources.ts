import { CONFIG } from 'config';
import { Context } from 'models/context';
import { extractData } from 'steps/extract';
import { fetchCosmeticsPage } from 'steps/fetch';
import { CosmeticIdentity, getCosmeticKey, sortCosmeticIdentities, toCosmeticIdentity } from 'utils';

const scrapeIdentities = async (context: Context): Promise<CosmeticIdentity[]> => {
  const page = await fetchCosmeticsPage(context);
  const cosmetics = extractData(page, context);
  return sortCosmeticIdentities(cosmetics.map(toCosmeticIdentity));
};

const printDiff = (
  leftLabel: string,
  left: CosmeticIdentity[],
  rightLabel: string,
  right: CosmeticIdentity[]
): void => {
  const leftByKey = new Map(left.map(cosmetic => [getCosmeticKey(cosmetic), cosmetic]));
  const rightByKey = new Map(right.map(cosmetic => [getCosmeticKey(cosmetic), cosmetic]));

  const onlyInLeft = left.filter(cosmetic => !rightByKey.has(getCosmeticKey(cosmetic)));
  const onlyInRight = right.filter(cosmetic => !leftByKey.has(getCosmeticKey(cosmetic)));

  console.log(`--- ${leftLabel} (${left.length} items)`);
  console.log(`+++ ${rightLabel} (${right.length} items)`);
  console.log('');

  if (onlyInLeft.length === 0 && onlyInRight.length === 0) {
    console.log('No differences: both sources list the exact same cosmetics (by name + type).');
    return;
  }

  const lines = [
    ...onlyInLeft.map(cosmetic => ({ key: getCosmeticKey(cosmetic), text: `- [${cosmetic.type}] ${cosmetic.name}` })),
    ...onlyInRight.map(cosmetic => ({ key: getCosmeticKey(cosmetic), text: `+ [${cosmetic.type}] ${cosmetic.name}` })),
  ].sort((a, b) => a.key.localeCompare(b.key));

  lines.forEach(line => console.log(line.text));

  console.log('');
  console.log(`Summary: ${onlyInLeft.length} only in ${leftLabel}, ${onlyInRight.length} only in ${rightLabel}.`);
};

(async() => {

  const [labytool, fandom] = await Promise.all([
    scrapeIdentities(CONFIG.contexts.labytool),
    scrapeIdentities(CONFIG.contexts.fandom),
  ]);

  printDiff('labytool', labytool, 'fandom', fandom);

  return 0;
})();
