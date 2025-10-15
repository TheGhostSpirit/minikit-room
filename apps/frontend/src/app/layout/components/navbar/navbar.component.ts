import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import * as f from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';

import { sharedImports, sharedProviders } from 'app/shared/shared.config';
import { GoogleAuthService } from 'app/core/services/google/google-auth.service';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';
import { ImportModalComponent } from 'app/core/components/import-modal/import-modal.component';
import { ExportModalComponent } from 'app/core/components/export-modal/export-modal.component';

@Component({
  selector: 'app-navbar',
  imports: [...sharedImports],
  providers: [...sharedProviders],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly authService = inject(GoogleAuthService);
  private readonly adminDbService = inject(IndexedDbAdminService);
  private readonly router = inject(Router);
  private readonly dialog = inject(DialogService);

  defaultProfilePicture = f.faUser;
  profile = this.authService.profile;

  loggedInMenu: MenuItem[] = [
    {
      label: 'Exporter sur Drive',
      command: () => this.dialog.open(
        ExportModalComponent,
        {
          header: 'Exporter des données sur Google Drive',
          width: '25vw',
          modal: true,
        }
      ),
    },
    {
      label: 'Importer depuis Drive',
      command: () => this.dialog.open(
        ImportModalComponent,
        {
          header: 'Importer des données depuis Google Drive',
          width: '25vw',
          modal: true,
        }
      ),
    },
    {
      label: 'Se déconnecter',
      command: () => { 
        this.authService.logout();
        this.router.navigate(['']);
      },
    },
  ];

  login() {
    this.authService.login();
  }
}
