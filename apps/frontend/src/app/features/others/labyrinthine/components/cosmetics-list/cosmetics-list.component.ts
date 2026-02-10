import { Component, computed, effect, model, signal } from '@angular/core';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';
import { CosmeticsFiltersComponent } from 'app/features/others/labyrinthine/components/cosmetics-filters/cosmetics-filters.component';

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
  readonly filteredCosmetics = signal<Cosmetic[]>([]);
  readonly filteredCosmeticsDefaultValueEffect = effect(() => {
    this.filteredCosmetics.set(this.cosmetics());
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

  //TODO move types to file
  filterChanged(filterChanges: any) {
    const filterByType = (cosmetic: Cosmetic, type: string | null) => !type || type === 'All types' || cosmetic.type === type;
    const filterByGroup = (cosmetic: Cosmetic, group: string | null) => !group || group === 'All groups' || cosmetic.source === group;
    const filterByFoundStatus = (cosmetic: Cosmetic, foundStatus: string | null) =>
      foundStatus === 'All' || foundStatus === 'Found' && cosmetic.found || foundStatus === 'Not Found' && !cosmetic.found;

    const filteredCosmetics = this.cosmetics()
      .filter(cosmetic => filterByType(cosmetic, filterChanges?.type ?? null))
      .filter(cosmetic => filterByGroup(cosmetic, filterChanges?.group ?? null))
      .filter(cosmetic => filterByFoundStatus(cosmetic, filterChanges?.found ?? null));

    this.filteredCosmetics.set(filteredCosmetics);
  }

}
