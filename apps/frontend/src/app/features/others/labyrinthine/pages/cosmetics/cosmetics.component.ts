import { Component, computed, effect, inject, signal } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { toSignal } from '@angular/core/rxjs-interop';

import * as f from '@fortawesome/free-solid-svg-icons';

import { map } from 'rxjs/operators';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { CosmeticService } from 'app/features/others/labyrinthine/services/cosmetic.service';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';
import { COSMETIC_TYPES } from 'app/features/others/labyrinthine/models/cosmetic-types';
import { CommitService } from 'app/features/others/labyrinthine/services/commit.service';
import { Commit, createCommit } from 'app/features/others/labyrinthine/models/commit';

@Component({
  selector: 'app-cosmetics',
  imports: [...sharedImports, ...sharedDeclarations],
  templateUrl: './cosmetics.component.html'
})
export class CosmeticsComponent {
  private readonly cosmeticService = inject(CosmeticService);
  private readonly commitService = inject(CommitService);
  private readonly formBuilder = inject(FormBuilder);

  icons = {
    medal: f.faMedal,
    commit: f.faCheck,
  };

  readonly rawCosmetics = toSignal(
    this.cosmeticService.list()
      .pipe(
        map((cosmetics) => cosmetics.map(([cosmetic, blob]) => this.getCosmeticWithImage(cosmetic, blob))),
      ),
    { initialValue: [] as Cosmetic[] }
  );
  getCosmeticWithImage(cosmetic: Cosmetic, blob: Blob): Cosmetic {
    return {
      ...cosmetic,
      icon: URL.createObjectURL(blob),
    };
  }

  readonly commits = toSignal(this.commitService.list(), { initialValue: [] as Commit[] });
  readonly cosmetics = signal<Cosmetic[]>([]);
  readonly cosmeticEffect = effect(() => {
    const commits = this.commits();
    const cosmetics = this.rawCosmetics();
    const foundCosmetics = commits.flatMap(commit => commit.cosmetics);
    this.cosmetics.set(
      cosmetics.map(cosmetic =>
        foundCosmetics.find(fc => fc.name === cosmetic.name && fc.type === cosmetic.type)
          ? { ...cosmetic, found: true }
          : cosmetic
      )
    );
  });

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
    const filterByType = (cosmetic: Cosmetic, type: string | null) => !type || type === this.allTypes || cosmetic.type === type;
    const filterByGroup = (cosmetic: Cosmetic, group: string | null) => !group || group === this.allGroups || cosmetic.source === group;

    return this.cosmetics()
      .filter(cosmetic => filterByType(cosmetic, filterChanges?.type ?? null))
      .filter(cosmetic => filterByGroup(cosmetic, filterChanges?.group ?? null));
  });

  selectCosmetic(selectedCosmetic: Cosmetic) {
    if (selectedCosmetic.found) {
      return;
    }

    this.cosmetics.update(
      cosmetics => cosmetics.map(cosmetic => selectedCosmetic.id === cosmetic.id ? { ...cosmetic, selected: !cosmetic.selected } : cosmetic)
    );
  }

  isCommitting = signal(false);
  canCommit = computed(() =>
    !this.isCommitting() && this.cosmetics().some(cosmetic => cosmetic.selected)
  );

  commit() {
    const selectedCosmetics = this.cosmetics().filter(cosmetic => cosmetic.selected);
    const selectedCosmeticIds = new Set(selectedCosmetics.map(cosmetic => cosmetic.id));
    this.isCommitting.set(true);

    this.commitService.create(
      createCommit(selectedCosmetics)
    ).subscribe(() => {
      this.isCommitting.set(false);
      this.cosmetics.update(
        cosmetics => cosmetics.map(cosmetic => selectedCosmeticIds.has(cosmetic.id) ? { ...cosmetic, selected: false, found: true }: cosmetic)
      );
    });

  }
}
