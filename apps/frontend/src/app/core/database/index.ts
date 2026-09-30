export const DB_KEYS = {
  game: 'game',
  album: 'album',
  commit: 'commit',
  metadata: 'metadata',
};

export const DB_INDEXES = {
  [DB_KEYS.game]: '++id',
  [DB_KEYS.album]: '++id',
  [DB_KEYS.commit]: '++id',
  [DB_KEYS.metadata]: '++id, &key',
};
