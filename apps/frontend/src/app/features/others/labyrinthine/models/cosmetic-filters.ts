export const COSMETIC_FOUND_STATUS = [
  'All',
  'Found',
  'Not Found',
] as const;

export type CosmeticFoundStatus = typeof COSMETIC_FOUND_STATUS[number];

export const COSMETIC_TYPE_FILTER_ALL = 'All types';
export const COSMETIC_GROUP_FILTER_ALL = 'All groups';

export type CosmeticFilters = {
  type?: string | null;
  group?: string | null;
  found?: CosmeticFoundStatus | null;
};
