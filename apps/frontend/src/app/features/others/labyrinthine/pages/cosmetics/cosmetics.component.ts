import { Component, inject } from '@angular/core';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { CosmeticScraperService } from 'app/features/others/labyrinthine/services/cosmetic-scraper.service';

@Component({
  selector: 'app-cosmetics',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './cosmetics.component.html'
})
export class CosmeticsComponent {
  private readonly cosmeticsService = inject(CosmeticScraperService);

  init() {
    console.log('init');
  }
}
