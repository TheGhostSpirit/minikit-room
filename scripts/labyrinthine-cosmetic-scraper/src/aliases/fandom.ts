import { CosmeticGroup, CosmeticType } from '@mkr/shared/labyrinthine';

const groupAliases = new Map<CosmeticGroup, string[]>([
  [
    'Hardcore',
    [
      'Hardcore',
      'Hardcore Cases',
    ],
  ],
  [
    'All Maps',
    [
      'All Mazes',
    ],
  ],
  [
    'Map/Monster Exclusive',
    [
      'Kept Hedges',
      'Crypts',
      'Forest',
      'Unkept Hedges',
      'Cornfield',
      'Snowy Hedges',
      'Sewer',
      'Manor',
      'Bamboo Forest',
      'Trenches',
      'Castle',
      'Swamp',
      'Carnival',
      'Dead Forest',
      'Mines',
      'Backrooms',
      'Ruins',
      'Fog City',
      'Pigman',
      'Smiley',
      'Wickerman',
    ],
  ],
  [
    'Summer',
    [
      'Summer',
    ],
  ],
  [
    'Easter',
    [
      'Easter',
    ],
  ],
  [
    'Halloween',
    [
      'Halloween',
    ],
  ],
  [
    'Christmas',
    [
      'Christmas',
    ],
  ],
  [
    'Valentine',
    [
      'Valentine',
    ],
  ],
  [
    `St Patrick's`,
    [
      'St. Patrick',
    ],
  ],
  [
    'Supporter Edition',
    [
      'Supporter DLC',
    ],
  ],
  [
    'Special',
    [
      'Shop',
      'Legacy',
      'Hidden',
      'Reach level',
      'Story Mode',
      'Level 400',
      'Private-Testing',
      'Playing in VR',
    ],
  ],
]);

const typeAliases = new Map<CosmeticType, string[]>([]);

export const resolveAliases = { typeAliases, groupAliases };
