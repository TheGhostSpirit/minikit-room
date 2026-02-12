import { Component, computed, model, signal } from '@angular/core';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';
import { CosmeticsFiltersComponent } from 'app/features/others/labyrinthine/components/cosmetics-filters/cosmetics-filters.component';
import { COSMETIC_GROUP_FILTER_ALL, COSMETIC_TYPE_FILTER_ALL, CosmeticFilters, CosmeticFoundStatus } from 'app/features/others/labyrinthine/models/cosmetic-filters';

@Component({
  selector: 'app-cosmetics-list',
  imports: [...sharedImports, ...sharedDeclarations, CosmeticsFiltersComponent],
  templateUrl: './cosmetics-list.component.html',
})
export class CosmeticsListComponent {

  icons = {
    medal: f.faMedal,
  };

  readonly cosmetics = model<Cosmetic[]>([]);
  readonly filters = signal<CosmeticFilters>({ type: null, group: null, found: null });

  readonly filteredCosmetics = computed(() => {
    const filterChanges = this.filters();
    const cosmetics = this.cosmetics();

    const filterByType = (cosmetic: Cosmetic, type: string | null) => !type || type === COSMETIC_TYPE_FILTER_ALL || cosmetic.type === type;
    const filterByGroup = (cosmetic: Cosmetic, group: string | null) => !group || group === COSMETIC_GROUP_FILTER_ALL || cosmetic.source === group;
    const filterByFoundStatus = (cosmetic: Cosmetic, foundStatus: CosmeticFoundStatus | null) => {
      switch (foundStatus) {
        case 'Found': return cosmetic.found;
        case 'Not Found': return !cosmetic.found;
        case 'All': return true;
        default: return true;
      }
    };

    return cosmetics
      .filter(cosmetic => filterByType(cosmetic, filterChanges?.type ?? null))
      .filter(cosmetic => filterByGroup(cosmetic, filterChanges?.group ?? null))
      .filter(cosmetic => filterByFoundStatus(cosmetic, filterChanges?.found ?? null));
  });

  readonly groupedByType = computed(() => {
    return Object.entries(
      this.filteredCosmetics().reduce((record, cosmetic) => {
        record[cosmetic.type] ??= [];
        record[cosmetic.type].push(cosmetic);
        return record;
      }, {} as Record<string, Cosmetic[]>)
    );
  });

  selectCosmetic(selectedCosmetic: Cosmetic) {
    if (selectedCosmetic.found) {
      return;
    }

    this.cosmetics.update(
      cosmetics => cosmetics.map(cosmetic => selectedCosmetic.id === cosmetic.id ? { ...cosmetic, selected: !cosmetic.selected } : cosmetic)
    );
  }

  filterChanged(filterChanges: CosmeticFilters) {
    this.filters.set(filterChanges);
  }

}
