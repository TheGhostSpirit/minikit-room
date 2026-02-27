import { Component, computed, inject, input } from '@angular/core';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedImports } from 'app/shared/shared.config';
import { ObjectCompressionService } from 'app/shared/services/object-compression.service';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';

@Component({
  selector: 'app-cosmetics-compare',
  imports: [...sharedImports],
  templateUrl: './cosmetics-compare.component.html',
})
export class CosmeticsCompareComponent {
  private readonly objectCompressionService = inject(ObjectCompressionService);

  readonly icons = {
    copy: f.faCopy,
  };

  readonly cosmetics = input<Cosmetic[]>([]);

  readonly foundCosmeticsHash = computed(() => {
    const cosmetics = this.cosmetics();
    const foundCosmetics  = cosmetics.filter(cosmetic => cosmetic.found).map(cosmetic => ({ name: cosmetic.name, type: cosmetic.type }));
    return this.objectCompressionService.compress(foundCosmetics);
  });

  readonly customCosmetics1 = computed(() => {
    const cosmetics = this.cosmetics();
    return cosmetics.slice(0, 3);
  });

  readonly customCosmetics2 = computed(() => {
    const cosmetics = this.cosmetics();
    return cosmetics.slice(4, 6);
  });
}
