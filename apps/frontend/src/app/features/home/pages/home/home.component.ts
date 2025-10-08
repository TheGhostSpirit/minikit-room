import { Component, inject } from '@angular/core';

import { CommonModule } from 'app/shared/common-module';
import { GoogleAuthService } from 'app/core/services/google/google-auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  private readonly authService = inject(GoogleAuthService);

  profile = this.authService.profile;

  login() {
    this.authService.login();
  }

}
