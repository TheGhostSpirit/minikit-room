import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { GoogleAuthService } from 'app/core/services/google/google-auth.service';

@Component({
  selector: 'app-home',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly authService = inject(GoogleAuthService);

  readonly profile = toSignal(this.authService.profile$, { initialValue: null });

  login() {
    this.authService.login();
  }

}
