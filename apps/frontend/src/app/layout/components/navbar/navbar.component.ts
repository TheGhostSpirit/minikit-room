import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import * as f from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';

import { sharedImports } from 'app/shared/shared.config';
import { GoogleAuthService } from 'app/core/services/google/google-auth.service';
import { IndexedDbAdminService } from 'app/core/services/indexed-db/indexed-db-admin.service';

@Component({
  selector: 'app-navbar',
  imports: [...sharedImports],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  private readonly authService = inject(GoogleAuthService);
  private readonly adminDbService = inject(IndexedDbAdminService);
  private readonly router = inject(Router);

  defaultProfilePicture = f.faUser;
  profile = this.authService.profile;

  loggedInMenu: MenuItem[] = [
    {
      label: 'Synchroniser sur Drive',
      command: () => this.adminDbService.export(),
    },
    //TODO: add warning popup before calling import
    {
      label: 'Restaurer depuis Drive',
      command: () => this.adminDbService.import(),
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
