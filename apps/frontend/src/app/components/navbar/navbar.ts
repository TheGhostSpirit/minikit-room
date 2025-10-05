import { Component, inject } from '@angular/core';

import * as f from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';

import { CommonModule } from 'app/common-module';
import { GoogleAuthService } from 'app/services/google-auth-service';
import { IndexedDbAdminService } from 'app/services/indexed-db-admin-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private readonly authService = inject(GoogleAuthService);
  private readonly adminDbService = inject(IndexedDbAdminService);

  defaultProfilePicture = f.faUser;
  profile = this.authService.profile;

  loggedInMenu: MenuItem[] = [
    {
      label: 'Synchroniser sur Drive',
      command: () => this.adminDbService.export(),
    },
    {
      label: 'Se déconnecter',
      command: () => this.authService.logout(),
    },
  ];

  login() {
    this.authService.login();
  }
}
