export interface DriveFile {
  id: string;
  name: string;
}

const FILE_PREFIX = 'backup-';

const getBackupFiles = (files: DriveFile[]): DriveFile[] => {
  return files.filter(f => f.name.startsWith(FILE_PREFIX));
};

const getDateFromName = (name: string) => new Date(name.split(FILE_PREFIX)[1]);

//TODO: remove
export const getMostRecentBackupFile = (files: DriveFile[]): DriveFile => {
  const backupFiles = getBackupFiles(files);
  backupFiles.sort((a, b) => getDateFromName(b.name).getTime() - getDateFromName(a.name).getTime());
  return backupFiles[0];
};

export const getMostRecentBackupFiles = (files: DriveFile[]): DriveFile[] => {
  const backupFiles = getBackupFiles(files);
  backupFiles.sort((a, b) => getDateFromName(b.name).getTime() - getDateFromName(a.name).getTime());
  return backupFiles.slice(0, 5);
};

export const extractDateFromBackupFileName = (file: DriveFile): Date => {
  return new Date(file.name.split(FILE_PREFIX)[1]);
};

export const getNewBackupFileName = () => FILE_PREFIX + new Date().toISOString();
