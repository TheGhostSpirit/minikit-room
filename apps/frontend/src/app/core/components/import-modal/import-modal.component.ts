import { Component, inject } from '@angular/core';

import { DynamicDialogRef } from 'primeng/dynamicdialog';

import { sharedImports } from 'app/shared/shared.config';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';

@Component({
  selector: 'app-import-modal',
  imports: [...sharedImports],
  templateUrl: './import-modal.component.html',
})
export class ImportModalComponent {

  private readonly ref = inject(DynamicDialogRef);
  private readonly adminDbService = inject(IndexedDbAdminService);

  cancel() {
    this.ref.close();
  }

  import() {
    this.adminDbService.import();
    this.ref.close();
  }
}
