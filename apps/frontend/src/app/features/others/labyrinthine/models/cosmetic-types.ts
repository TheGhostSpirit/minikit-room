export const COSMETIC_TYPES = [
  'Head',
  'Clothing',
  'Wrist',
  'Flashlight',
  'Lantern',
  'Glowsticks',
  'Face',
  'Records',
] as const;

export type CosmeticType = typeof COSMETIC_TYPES[number];
