export const COSMETIC_GROUPS = [
  `St Patrick's`,
  'Summer',
  'All Maps',
  'Map/Monster Exclusive',
  'Hardcore',
  'Halloween',
  'Christmas',
  'Easter',
  'Special',
  'Supporter Edition',
  'Valentine',
] as const;

export type CosmeticGroup = typeof COSMETIC_GROUPS[number];
