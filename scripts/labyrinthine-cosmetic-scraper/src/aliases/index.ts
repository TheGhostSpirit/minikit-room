import { Cosmetic } from 'models/cosmetic';
import { Extractors } from 'models/extractors';

import { resolveAliases as fandomAliasResolver } from 'aliases/fandom';
import { resolveAliases as labytoolAliasResolver } from 'aliases/labytool';
import { AliasResolver } from 'models/alias-resolver';
import { printUnresolvedAliases } from 'aliases/utils';

const aliasResolverMap = new Map<Extractors, AliasResolver>([
  [Extractors.FANDOM, fandomAliasResolver],
  [Extractors.LABYTOOL, labytoolAliasResolver],
]);

export const resolveAliases = (cosmetics: Cosmetic[], extractor: Extractors): Cosmetic[] => {
  const selectedAliasResolver =  aliasResolverMap.get(extractor);

  if (!selectedAliasResolver) {
    throw new Error('No alias resolver linked to this extractor');
  }

  const { groupAliases, typeAliases } = selectedAliasResolver;

  for (const [group, aliases] of groupAliases.entries()) {
    cosmetics
      .filter(cosmetic => aliases.find(alias => cosmetic.group.includes(alias)))
      .forEach(cosmetic => { cosmetic.group = group; });
  }

  for (const [type, aliases] of typeAliases.entries()) {
    cosmetics
      .filter(cosmetic => aliases.find(alias => cosmetic.type.includes(alias)))
      .forEach(cosmetic => { cosmetic.type = type; });
  }

  printUnresolvedAliases(cosmetics);

  return cosmetics;
};
