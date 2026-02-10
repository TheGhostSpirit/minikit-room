import { Component, computed, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import * as f from '@fortawesome/free-solid-svg-icons';

import { map } from 'rxjs/operators';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { CosmeticService } from 'app/features/others/labyrinthine/services/cosmetic.service';
import { Cosmetic } from 'app/features/others/labyrinthine/models/cosmetic';
import { CommitService } from 'app/features/others/labyrinthine/services/commit.service';
import { Commit, createCommit } from 'app/features/others/labyrinthine/models/commit';
import { CosmeticsListComponent } from 'app/features/others/labyrinthine/components/cosmetics-list/cosmetics-list.component';

@Component({
  selector: 'app-cosmetics',
  imports: [...sharedImports, ...sharedDeclarations, CosmeticsListComponent],
  templateUrl: './cosmetics.component.html'
})
export class CosmeticsComponent {
  private readonly cosmeticService = inject(CosmeticService);
  private readonly commitService = inject(CommitService);

  icons = {
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

  readonly isCommitting = signal(false);
  readonly canCommit = computed(() =>
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
        cosmetics => cosmetics.map(cosmetic => selectedCosmeticIds.has(cosmetic.id) ? { ...cosmetic, selected: false, found: true } : cosmetic)
      );
    });
  }
}
