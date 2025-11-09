import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { map } from 'rxjs/operators';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';
import { ImportState } from 'app/core/models/import-state';
import { ImportTargetsComponent } from 'app/core/components/import-targets/import-targets.component';
import { DriveFile } from 'app/core/models/drive-file';

@Component({
  selector: 'app-import-modal',
  imports: [...sharedImports, ...sharedDeclarations, ImportTargetsComponent],
  templateUrl: './import-modal.component.html',
})
export class ImportModalComponent {

  private readonly ref = inject(DynamicDialogRef);
  private readonly adminDbService = inject(IndexedDbAdminService);
  private readonly router = inject(Router);

  isImporting = false;
  importingStatus$ = this.adminDbService.getImportState().pipe(
    map(state => this.getLabelFromState(state))
  );

  selectedFile: DriveFile | null = null;
  fileSelected(file: DriveFile) {
    this.selectedFile = file;
  }

  private getLabelFromState(state: ImportState) {
    switch(state) {
      case ImportState.NOT_IMPORTING:
        return { progress: 0, label: 'Initialisation' };
      case ImportState.DOWNLOADING:
        return { progress: 25, label: 'Téléchargement' };
      case ImportState.DECOMPRESSING:
        return { progress: 50, label: 'Décompression' };
      case ImportState.IMPORTING:
        return { progress: 75, label: 'Import' };
      case ImportState.FINISHED:
        return { progress: 100, label: 'Finalisation' };
    }
  }

  cancel() {
    this.ref.close();
  }

  import() {
    this.isImporting = true;

    if (!this.selectedFile) {
      return;
    }

    this.adminDbService.import(this.selectedFile).subscribe(() => {
      this.router.navigate(['/']);
      this.ref.close();
    });
  }
}
