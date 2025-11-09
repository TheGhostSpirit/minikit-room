import { Component, inject, output } from '@angular/core';

import * as f from '@fortawesome/free-solid-svg-icons';
import { DriveFile, extractDateFromBackupFileName } from 'app/core/models/drive-file';

import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';
import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';

@Component({
  selector: 'app-import-targets',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './import-targets.component.html'
})
export class ImportTargetsComponent {

  private readonly adminDbService = inject(IndexedDbAdminService);

  icons = {
    file: f.faFile,
  };

  fileSelected = output<DriveFile>();

  files$ = this.adminDbService.getRecentBackupFiles();
  selectedFile: DriveFile | null = null;

  selectFile(file: DriveFile) {
    this.selectedFile = file;
    this.fileSelected.emit(file);
  }

  getFileDateLabel(file: DriveFile) {
    const date = extractDateFromBackupFileName(file);
    return `${date.getDate()}/${date.getMonth() + 1} ${date.getHours()}:${date.getMinutes()}`;
  }

}
