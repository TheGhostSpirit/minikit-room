export interface DriveFile {
  id: string;
  name: string;
}

export const getBackupFiles = (files: DriveFile[]): DriveFile[] => {
  return files.filter(f => f.name.startsWith('backup-'));
};

export const getMostRecentBackupFile = (files: DriveFile[]): DriveFile => {
  const getDateFromName = (name: string) => new Date(name.split('backup-')[1]);
  files.sort((a, b) => getDateFromName(b.name).getTime() - getDateFromName(a.name).getTime());
  return files[0];
};
