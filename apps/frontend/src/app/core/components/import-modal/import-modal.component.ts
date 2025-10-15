import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { map } from 'rxjs/operators';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';
import { ImportState } from 'app/core/models/import-state';

@Component({
  selector: 'app-import-modal',
  imports: [...sharedImports, ...sharedDeclarations],
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

  private getLabelFromState(state: ImportState) {
    switch(state) {
      case ImportState.NOT_IMPORTING:
        return { progress: 0, label: 'Initialisation' };
      case ImportState.DOWNLOADING:
        return { progress: 33, label: 'Téléchargement' };
      case ImportState.IMPORTING:
        return { progress: 66, label: 'Import' };
      case ImportState.FINISHED:
        return { progress: 100, label: 'Finalisation' };
    }
  }

  cancel() {
    this.ref.close();
  }

  import() {
    this.isImporting = true;
    this.adminDbService.import().subscribe(() => {
      this.router.navigate(['/']);
      this.ref.close();
    });
  }
}
