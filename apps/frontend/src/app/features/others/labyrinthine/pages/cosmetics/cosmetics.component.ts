import { Component, computed, effect, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { takeUntilDestroyed, toSignal } from '@angular/core/rxjs-interop';

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
export class CosmeticsComponent implements OnInit {
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
      this.cosmetics().reduce((record, cosmetic) => {
        record[cosmetic.type] ??= [];
        record[cosmetic.type].push(cosmetic);
        return record;
      }, {} as Record<string, Cosmetic[]>)
    );
  });

  allTypes = 'All types';
  allGroups = 'All groups';

  form: FormGroup = this.formBuilder.group({
    type: [this.allTypes],
    group: [this.allGroups],
  });

  filterChanges$ = this.form.valueChanges.pipe(takeUntilDestroyed());

  types = [ this.allTypes, ...COSMETIC_TYPES ];
  groups = [ this.allGroups ];
  getAllGroups(cosmetics: Cosmetic[]): string[] {
    return [...new Set(cosmetics.map(cosmetic => cosmetic.source))];
  }
  readonly groupEffect = effect(() => {
    this.groups = [ this.allGroups, ...this.getAllGroups(this.cosmetics()) ];
  });

  ngOnInit() {
  this.filterChanges$
    .subscribe(value => {
      console.log(value);
    });
  }

}
