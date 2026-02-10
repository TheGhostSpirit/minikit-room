import { Component, computed, effect, inject, input, output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import { sharedImports } from 'app/shared/shared.config';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';
import { COSMETIC_TYPES } from 'app/features/others/labyrinthine/models/cosmetic-types';

@Component({
  selector: 'app-cosmetics-filters',
  imports: [...sharedImports],
  templateUrl: './cosmetics-filters.component.html',
})
export class CosmeticsFiltersComponent {

  private readonly formBuilder = inject(FormBuilder);

  readonly cosmetics = input<Cosmetic[]>([]);
  readonly filterChanged = output<typeof this.form.value>();

  allTypes = 'All types';
  allGroups = 'All groups';
  types = [ this.allTypes, ...COSMETIC_TYPES ];
  groups = [ this.allGroups ];
  foundStatus = [ 'All', 'Found', 'Not Found' ];

  readonly form = this.formBuilder.group({
    type: [this.allTypes],
    group: [this.allGroups],
    found: [this.foundStatus[0]],
  });

  readonly groupEffect = effect(() => {
    this.groups = [ this.allGroups, ...this.getAllGroups(this.cosmetics()) ];
  });
  getAllGroups(cosmetics: Cosmetic[]): string[] {
    return [...new Set(cosmetics.map(cosmetic => cosmetic.source))];
  }

  readonly filterChanges = toSignal(this.form.valueChanges, { initialValue: this.form.value });
  readonly filterChangesEffect = effect(() => {
    const filterChanges = this.filterChanges();
    this.filterChanged.emit(filterChanges);
  });

}
