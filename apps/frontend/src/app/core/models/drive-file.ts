export interface DriveFile {
  id: string;
  name: string;
}

const FILE_PREFIX = 'backup-';

export const getBackupFiles = (files: DriveFile[]): DriveFile[] => {
  return files.filter(f => f.name.startsWith(FILE_PREFIX));
};

export const getMostRecentBackupFile = (files: DriveFile[]): DriveFile => {
  const getDateFromName = (name: string) => new Date(name.split(FILE_PREFIX)[1]);
  files.sort((a, b) => getDateFromName(b.name).getTime() - getDateFromName(a.name).getTime());
  return files[0];
};

export const getNewBackupFileName = () => FILE_PREFIX + new Date().toISOString();
