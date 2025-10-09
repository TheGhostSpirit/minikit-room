import { Component, inject } from '@angular/core';

import { sharedImports } from 'app/shared/shared.config';
import { GoogleAuthService } from 'app/core/services/google/google-auth.service';

@Component({
  selector: 'app-home',
  imports: [...sharedImports],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly authService = inject(GoogleAuthService);

  profile = this.authService.profile;

  login() {
    this.authService.login();
  }

}
