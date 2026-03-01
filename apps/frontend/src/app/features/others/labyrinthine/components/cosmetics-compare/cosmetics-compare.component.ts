import { Component, computed, inject, input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedImports } from 'app/shared/shared.config';
import { ObjectCompressionService } from 'app/shared/services/object-compression.service';
import { Cosmetic, CosmeticIdentifier, CosmeticUtils } from 'app/features/others/labyrinthine/models/cosmetic';

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

  readonly codeFormControl = new FormControl('');
  readonly codeToCompare = toSignal(
    this.codeFormControl.valueChanges,
    { initialValue: this.codeFormControl.value }
  );

  readonly myFoundCosmetics = computed(() => {
    const cosmetics = this.cosmetics();
    return cosmetics.filter(cosmetic => cosmetic.found).map(cosmetic => CosmeticUtils.toCosmeticIdentifier(cosmetic));
  });

  readonly myFoundCosmeticsHash = computed(() => {
    const myFoundCosmetics = this.myFoundCosmetics();
    return this.objectCompressionService.compress(myFoundCosmetics);
  });

  copyToClipboard() {
    return navigator.clipboard.writeText(this.myFoundCosmeticsHash());
  }

  readonly theirFoundCosmetics = computed(() => {
    const codeToCompare = this.codeToCompare();

    if (!codeToCompare) {
      return [];
    }
  
    return this.objectCompressionService.decompress<CosmeticIdentifier[]>(codeToCompare);
  });

  readonly myUniqueCosmetics = computed(() => {
    const cosmetics = this.cosmetics();
    const myFoundCosmetics = this.myFoundCosmetics();
    const theirFoundCosmetics = this.theirFoundCosmetics();

    if (theirFoundCosmetics.length === 0) {
      return [];
    }

    const myUniqueCosmeticIdentifiers = myFoundCosmetics.filter(mfc => !theirFoundCosmetics.find(tfc => CosmeticUtils.isSameCosmetic(mfc, tfc)));
    return myUniqueCosmeticIdentifiers.map(identifier => cosmetics.find(cosmetic => CosmeticUtils.isSameCosmetic(identifier, cosmetic)) as Cosmetic);
  });

  readonly theirUniqueCosmetics = computed(() => {
    const cosmetics = this.cosmetics();
    const myFoundCosmetics = this.myFoundCosmetics();
    const theirFoundCosmetics = this.theirFoundCosmetics();

    if (theirFoundCosmetics.length === 0) {
      return [];
    }

    const theirUniqueCosmeticIdentifiers = theirFoundCosmetics.filter(tfc => !myFoundCosmetics.find(mfc => CosmeticUtils.isSameCosmetic(mfc, tfc)));
    return theirUniqueCosmeticIdentifiers.map(identifier => cosmetics.find(cosmetic => CosmeticUtils.isSameCosmetic(identifier, cosmetic)) as Cosmetic);
  });
}
