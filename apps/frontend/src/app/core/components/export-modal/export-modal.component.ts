import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';
import { ExportState } from 'app/core/models/export-state';
import { AutoSyncService } from 'app/core/services/sync/auto-sync.service';

@Component({
  selector: 'app-export-modal',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './export-modal.component.html',
})
export class ExportModalComponent {

  private readonly ref = inject(DynamicDialogRef);
  private readonly adminDbService = inject(IndexedDbAdminService);
  private readonly autoSyncService = inject(AutoSyncService);
  private readonly messageService = inject(MessageService);

  isExporting = false;
  readonly exportingStatus = toSignal(this.adminDbService.getExportState(), { initialValue: ExportState.NOT_EXPORTING });
  readonly exportingStatusLabel = computed(() => {
    const exportingStatus = this.exportingStatus();
    switch(exportingStatus) {
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
  });

  cancel() {
    this.ref.close();
  }

  export() {
    this.isExporting = true;
    this.adminDbService.export().subscribe({
      next: () => {
        this.autoSyncService.clearConflict();
        this.ref.close();
      },
      error: error => {
        console.error('[Export] export failed', error);
        this.isExporting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Échec de l\'export',
          detail: 'L\'export vers Google Drive a échoué.',
        });
      },
    });
  }
}
