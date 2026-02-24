import { Component, inject, output } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

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

  readonly files = toSignal(this.adminDbService.getRecentBackupFiles(), { initialValue: [] as DriveFile[] });
  selectedFile: DriveFile | null = null;

  selectFile(file: DriveFile) {
    this.selectedFile = file;
    this.fileSelected.emit(file);
  }

  getFileDateLabel(file: DriveFile) {
    const date = extractDateFromBackupFileName(file);
    return Intl.DateTimeFormat('fr', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date);
  }

}
