import { Component, computed, effect, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { map } from 'rxjs/operators';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { CosmeticService } from 'app/features/others/labyrinthine/services/cosmetic.service';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';
import { COSMETIC_TYPES } from 'app/features/others/labyrinthine/models/cosmetic-types';

@Component({
  selector: 'app-cosmetics',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './cosmetics.component.html'
})
export class CosmeticsComponent {
  private readonly cosmeticService = inject(CosmeticService);
  private readonly formBuilder = inject(FormBuilder);

  cosmetics = toSignal(
    this.cosmeticService.list()
      .pipe(
        map((cosmetics) => cosmetics.map(([cosmetic, blob]) => this.getCosmeticWithImage(cosmetic, blob)))
      ),
    { initialValue: [] as Cosmetic[] }
  );
  getCosmeticWithImage(cosmetic: Cosmetic, blob: Blob): Cosmetic {
    return {
      ...cosmetic,
      icon: URL.createObjectURL(blob),
    };
  }

  groupedByType = computed(() => {
    return Object.entries(
      this.filteredCosmetics().reduce((record, cosmetic) => {
        record[cosmetic.type] ??= [];
        record[cosmetic.type].push(cosmetic);
        return record;
      }, {} as Record<string, Cosmetic[]>)
    );
  });

  allTypes = 'All types';
  allGroups = 'All groups';
  types = [ this.allTypes, ...COSMETIC_TYPES ];
  groups = [ this.allGroups ];
  form = this.formBuilder.group({
    type: [this.allTypes],
    group: [this.allGroups],
  });
  getAllGroups(cosmetics: Cosmetic[]): string[] {
    return [...new Set(cosmetics.map(cosmetic => cosmetic.source))];
  }
  readonly groupEffect = effect(() => {
    this.groups = [ this.allGroups, ...this.getAllGroups(this.cosmetics()) ];
  });

  filterChanges = toSignal(this.form.valueChanges, { initialValue: this.form.value });
  filteredCosmetics = computed(() => {
    const filterChanges = this.filterChanges();
    const filterByType = (cosmetic: Cosmetic, type: string | null) => {
      if (!type || type === this.allTypes) {
        return true;
      }
      return cosmetic.type === type;
    };
    const filterByGroup = (cosmetic: Cosmetic, group: string | null) => {
      if (!group || group === this.allGroups) {
        return true;
      }
      return cosmetic.source === group;
    };
    return this.cosmetics()
      .filter(cosmetic => filterByType(cosmetic, filterChanges?.type ?? null))
      .filter(cosmetic => filterByGroup(cosmetic, filterChanges?.group ?? null));
  });
}
