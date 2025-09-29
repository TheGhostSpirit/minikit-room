import { Component, inject } from '@angular/core';

import * as f from '@fortawesome/free-solid-svg-icons';
import { MenuItem } from 'primeng/api';

import { CommonModule } from 'app/common-module';
import { GoogleAuthService } from 'app/services/google-auth-service';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar {
  private authService = inject(GoogleAuthService);

  defaultProfilePicture = f.faUser;
  profile = this.authService.profile;

  loggedInMenu: MenuItem[] = [
    {
      label: 'Logout',
      command: () => this.authService.logout(),
    },
  ];

  login() {
    this.authService.login();
  }
}
