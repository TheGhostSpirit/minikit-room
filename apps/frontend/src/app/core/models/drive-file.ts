export interface DriveFile {
  id: string;
  name: string;
}

const FILE_PREFIX = 'backup-';

const getBackupFiles = (files: DriveFile[]): DriveFile[] => {
  return files.filter(f => f.name.startsWith(FILE_PREFIX));
};

const getDateFromName = (name: string) => new Date(name.split(FILE_PREFIX)[1]);

const sortBackupFilesByDateDesc = (files: DriveFile[]): DriveFile[] => {
  return getBackupFiles(files)
    .sort((a, b) => getDateFromName(b.name).getTime() - getDateFromName(a.name).getTime());
};

export const getMostRecentBackupFiles = (files: DriveFile[]): DriveFile[] => {
  return sortBackupFilesByDateDesc(files).slice(0, 5);
};

export const getBackupFilesToPrune = (files: DriveFile[], maxToKeep: number): DriveFile[] => {
  return sortBackupFilesByDateDesc(files).slice(maxToKeep);
};

export const extractDateFromBackupFileName = (file: DriveFile): Date => {
  return new Date(file.name.split(FILE_PREFIX)[1]);
};

export const getNewBackupFileName = () => FILE_PREFIX + new Date().toISOString();
