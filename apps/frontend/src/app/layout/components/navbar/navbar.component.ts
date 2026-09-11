import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';

import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import * as f from '@fortawesome/free-solid-svg-icons';
import { DialogService } from 'primeng/dynamicdialog';

import { sharedDeclarations, sharedImports, sharedProviders } from 'app/shared/shared.config';
import { GoogleAuthService } from 'app/core/services/google/google-auth.service';
import { ImportModalComponent } from 'app/core/components/import-modal/import-modal.component';
import { ExportModalComponent } from 'app/core/components/export-modal/export-modal.component';
import { AutoSyncService } from 'app/core/services/sync/auto-sync.service';

interface SyncStatusView {
  icon: IconDefinition;
  label: string;
  spin: boolean;
  modifierClass: string;
}

@Component({
  selector: 'app-navbar',
  imports: [...sharedImports, ...sharedDeclarations],
  providers: [...sharedProviders],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly authService = inject(GoogleAuthService);
  private readonly router = inject(Router);
  private readonly dialog = inject(DialogService);
  private readonly autoSyncService = inject(AutoSyncService);

  defaultProfilePicture = f.faUser;
  exportIcon = f.faCloudArrowUp;
  importIcon = f.faCloudArrowDown;
  logoutIcon = f.faRightFromBracket;
  conflictIcon = f.faTriangleExclamation;
  syncingIcon = f.faRotate;
  upToDateIcon = f.faCircleCheck;

  readonly profile = toSignal(this.authService.profile$, { initialValue: null });

  readonly syncStatus = toSignal(
    combineLatest([this.autoSyncService.conflict$, this.autoSyncService.syncing$]).pipe(
      map(([conflict, syncing]): SyncStatusView => {
        if (conflict) {
          return { icon: this.conflictIcon, label: 'Conflit de synchronisation', spin: false, modifierClass: 'navbar-popover-status--conflict' };
        }
        if (syncing) {
          return { icon: this.syncingIcon, label: 'Synchronisation en cours', spin: true, modifierClass: 'navbar-popover-status--syncing' };
        }
        return { icon: this.upToDateIcon, label: 'À jour', spin: false, modifierClass: 'navbar-popover-status--ok' };
      }),
    ),
    { initialValue: { icon: this.upToDateIcon, label: 'À jour', spin: false, modifierClass: 'navbar-popover-status--ok' } },
  );

  login() {
    this.authService.login();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['']);
  }

  openExportModal() {
    this.dialog.open(
      ExportModalComponent,
      {
        header: 'Exporter des données sur Google Drive',
        width: '25vw',
        modal: true,
      }
    );
  }

  openImportModal() {
    this.dialog.open(
      ImportModalComponent,
      {
        header: 'Importer des données depuis Google Drive',
        width: '40vw',
        modal: true,
      }
    );
  }
}
