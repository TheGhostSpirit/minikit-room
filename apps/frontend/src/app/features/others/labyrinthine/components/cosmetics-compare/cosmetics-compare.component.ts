import { Component, input } from '@angular/core';

import { sharedImports } from 'app/shared/shared.config';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';

@Component({
  selector: 'app-cosmetics-compare',
  imports: [...sharedImports],
  templateUrl: './cosmetics-compare.component.html',
})
export class CosmeticsCompareComponent {
  readonly cosmetics = input<Cosmetic[]>([]);

}
