import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { GoogleAuthService } from 'app/core/services/google/google-auth.service';
import { NavbarPopoverComponent } from 'app/layout/components/navbar-popover/navbar-popover.component';

@Component({
  selector: 'app-navbar',
  imports: [...sharedImports, ...sharedDeclarations, NavbarPopoverComponent],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  private readonly authService = inject(GoogleAuthService);

  defaultProfilePicture = f.faUser;

  readonly profile = toSignal(this.authService.profile$, { initialValue: null });

  login() {
    this.authService.login();
  }
}
