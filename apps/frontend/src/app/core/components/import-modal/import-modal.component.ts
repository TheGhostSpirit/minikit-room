import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';
import { ImportState } from 'app/core/models/import-state';
import { ImportTargetsComponent } from 'app/core/components/import-targets/import-targets.component';
import { DriveFile } from 'app/core/models/drive-file';
import { AutoSyncService } from 'app/core/services/sync/auto-sync.service';

@Component({
  selector: 'app-import-modal',
  imports: [...sharedImports, ...sharedDeclarations, ImportTargetsComponent],
  templateUrl: './import-modal.component.html',
})
export class ImportModalComponent {

  private readonly ref = inject(DynamicDialogRef);
  private readonly adminDbService = inject(IndexedDbAdminService);
  private readonly router = inject(Router);
  private readonly autoSyncService = inject(AutoSyncService);
  private readonly messageService = inject(MessageService);

  isImporting = false;
  readonly importingStatus = toSignal(this.adminDbService.getImportState(), { initialValue: ImportState.NOT_IMPORTING });
  readonly importingStatusLabel = computed(() => {
    const importingStatus = this.importingStatus();
    switch(importingStatus) {
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
  });

  selectedFile: DriveFile | null = null;
  fileSelected(file: DriveFile) {
    this.selectedFile = file;
  }

  cancel() {
    this.ref.close();
  }

  import() {
    this.isImporting = true;

    if (!this.selectedFile) {
      return;
    }

    this.adminDbService.import(this.selectedFile).subscribe({
      next: () => {
        this.autoSyncService.clearConflict();
        this.router.navigate(['/']);
        this.ref.close();
      },
      error: error => {
        console.error('[Import] import failed', error);
        this.isImporting = false;
        this.messageService.add({
          severity: 'error',
          summary: 'Échec de l\'import',
          detail: 'L\'import depuis Google Drive a échoué.',
        });
      },
    });
  }
}
