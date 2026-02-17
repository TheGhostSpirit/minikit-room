import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { sharedImports } from 'app/shared/shared.config';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';
import { COSMETIC_TYPES } from 'app/features/others/labyrinthine/models/cosmetic-types';
import { COSMETIC_FOUND_STATUS, COSMETIC_GROUP_FILTER_ALL, COSMETIC_TYPE_FILTER_ALL } from 'app/features/others/labyrinthine/models/cosmetic-filters';
import { COSMETIC_GROUPS } from 'app/features/others/labyrinthine/models/cosmetic-groups';

@Component({
  selector: 'app-cosmetics-filters',
  imports: [...sharedImports],
  templateUrl: './cosmetics-filters.component.html',
})
export class CosmeticsFiltersComponent {

  private readonly formBuilder = inject(FormBuilder);

  readonly cosmetics = input<Cosmetic[]>([]);
  readonly filterChanged = output<typeof this.form.value>();

  allTypes = COSMETIC_TYPE_FILTER_ALL;
  allGroups = COSMETIC_GROUP_FILTER_ALL;
  types = [ this.allTypes, ...COSMETIC_TYPES ];
  groups = [ this.allGroups, ...COSMETIC_GROUPS ];
  foundStatus = [...COSMETIC_FOUND_STATUS];

  readonly form = this.formBuilder.group({
    type: [this.allTypes],
    group: [this.allGroups],
    found: [this.foundStatus[0]],
  });

  readonly filterChanges = toSignal(this.form.valueChanges, { initialValue: this.form.value });
  readonly filterChangesEffect = effect(() => {
    const filterChanges = this.filterChanges();
    this.filterChanged.emit(filterChanges);
  });

}
