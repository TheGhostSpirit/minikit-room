import { CONFIG } from 'config';
import { CosmeticIdentity, diffCosmeticIdentities, getCosmeticKey } from 'models/cosmetic-identity';
import { scrapeCosmeticIdentities } from 'steps/scrape-identities';

const printDiff = (
  leftLabel: string,
  left: CosmeticIdentity[],
  rightLabel: string,
  right: CosmeticIdentity[]
): void => {
  const { onlyInFirst: onlyInLeft, onlyInSecond: onlyInRight } = diffCosmeticIdentities(left, right);

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
    scrapeCosmeticIdentities(CONFIG.contexts.labytool),
    scrapeCosmeticIdentities(CONFIG.contexts.fandom),
  ]);

  printDiff('labytool', labytool, 'fandom', fandom);

  return 0;
})();
