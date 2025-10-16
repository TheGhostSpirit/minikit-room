import { Component, inject } from '@angular/core';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { map } from 'rxjs/operators';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';
import { ExportState } from 'app/core/models/export-state';

@Component({
  selector: 'app-export-modal',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './export-modal.component.html',
})
export class ExportModalComponent {

  private readonly ref = inject(DynamicDialogRef);
  private readonly adminDbService = inject(IndexedDbAdminService);

  isExporting = false;
  exportingStatus$ = this.adminDbService.getExportState().pipe(
    map(state => this.getLabelFromState(state))
  );

  private getLabelFromState(state: ExportState) {
    switch(state) {
      case ExportState.NOT_EXPORTING:
        return { progress: 0, label: 'Initialisation' };
      case ExportState.EXPORTING:
        return { progress: 25, label: 'Export' };
      case ExportState.COMPRESSING:
        return { progress: 50, label: 'Compression' };
      case ExportState.UPLOADING:
        return { progress: 75, label: 'Téléchargement' };
      case ExportState.FINISHED:
        return { progress: 100, label: 'Finalisation' };
    }
  }

  cancel() {
    this.ref.close();
  }

  export() {
    this.isExporting = true;
    this.adminDbService.export().subscribe(() => {
      this.ref.close();
    });
  }
}
