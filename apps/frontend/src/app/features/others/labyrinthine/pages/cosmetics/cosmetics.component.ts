import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs/operators';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { CosmeticService } from 'app/features/others/labyrinthine/services/cosmetic.service';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';

@Component({
  selector: 'app-cosmetics',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './cosmetics.component.html'
})
export class CosmeticsComponent {
  private readonly cosmeticService = inject(CosmeticService);
  cosmetics = toSignal(
    this.cosmeticService.list()
      .pipe(
        map((cosmetics) =>  cosmetics.map(([cosmetic, blob]) => this.getCosmeticWithImage(cosmetic, blob)))
      ),
    { initialValue: [] as Cosmetic[] }
  );

  getCosmeticWithImage(cosmetic: Cosmetic, blob: Blob): Cosmetic {
    return {
      ...cosmetic,
      icon: URL.createObjectURL(blob),
    };
  }
}
