import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from 'app/common-module';
import { GoogleAuthService } from 'app/services/google-auth-service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
})
export class Home {
  private readonly authService = inject(GoogleAuthService);
  private readonly router = inject(Router);

  profile = this.authService.profile;

  login() {
    this.authService.login();
  }

  goToPixeltheque() {
    this.router.navigate(['pixeltheque']);
  }
}
