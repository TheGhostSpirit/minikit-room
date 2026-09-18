import { CONFIG } from 'config';
import { CosmeticIdentity, diffCosmeticIdentities, getCosmeticKey } from 'models/cosmetic-identity';
import { readSnapshot } from 'steps/read-snapshot';
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

type SourceName = keyof typeof CONFIG.contexts | 'snapshot';

const sourceNames = [...Object.keys(CONFIG.contexts), 'snapshot'] as SourceName[];

const isSourceName = (name: string): name is SourceName =>
  (sourceNames as string[]).includes(name);

const loadSourceIdentities = (name: SourceName): Promise<CosmeticIdentity[]> =>
  name === 'snapshot' ? readSnapshot() : scrapeCosmeticIdentities(CONFIG.contexts[name]);

const parseArgs = (): [SourceName, SourceName] => {
  const [left, right] = process.argv.slice(2);

  if (!left || !right) {
    throw new Error('Usage: compare-sources <source> <source>');
  }

  if (!isSourceName(left) || !isSourceName(right)) {
    throw new Error(`Unknown source. Available sources: ${sourceNames.join(', ')}`);
  }

  if (left === right) {
    throw new Error('Please provide two different sources to compare.');
  }

  return [left, right];
};

(async() => {

  const [leftName, rightName] = parseArgs();

  const [left, right] = await Promise.all([
    loadSourceIdentities(leftName),
    loadSourceIdentities(rightName),
  ]);

  printDiff(leftName, left, rightName, right);

  return 0;
})();
