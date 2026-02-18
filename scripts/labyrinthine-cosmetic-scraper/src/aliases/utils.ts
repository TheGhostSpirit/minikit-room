import { Cosmetic } from 'models/cosmetic';
import { COSMETIC_GROUPS } from 'models/cosmetic-groups';
import { COSMETIC_TYPES } from 'models/cosmetic-types';

export const printUnresolvedAliases = (cosmetics: Cosmetic[]): void => {
  const cosmeticTypesSet = new Set(COSMETIC_TYPES);
  const cosmeticGroupsSet = new Set(COSMETIC_GROUPS);

  const unresolvedGroupsSet = new Set(
    cosmetics.filter(cosmetic => !cosmeticGroupsSet.has(cosmetic.group)).map(cosmetic => cosmetic.group)
  );

  const unresolvedGroups = [...unresolvedGroupsSet];
  if (unresolvedGroups.length > 0) {
    console.log('UNRESOLVED GROUPS');
    console.log(unresolvedGroups);
  }

  const unresolvedTypesSet = new Set(
    cosmetics.filter(cosmetic => !cosmeticTypesSet.has(cosmetic.type)).map(cosmetic => cosmetic.type)
  );

  const unresolvedTypes = [...unresolvedTypesSet];
  if (unresolvedTypes.length > 0) {
    console.log('UNRESOLVED TYPES');
    console.log(unresolvedTypes);
  }

};
