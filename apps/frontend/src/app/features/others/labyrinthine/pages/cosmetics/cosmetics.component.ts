import { Component, computed, DestroyRef, effect, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';

import * as f from '@fortawesome/free-solid-svg-icons';

import { sharedDeclarations, sharedImports } from 'app/shared/shared.config';
import { BlobUrlService } from 'app/shared/services/blob-url.service';
import { CosmeticService } from 'app/features/others/labyrinthine/services/cosmetic.service';
import { Cosmetic, CosmeticUtils } from 'app/features/others/labyrinthine/models/cosmetic';
import { CommitService } from 'app/features/others/labyrinthine/services/commit.service';
import { Commit, createCommit } from 'app/features/others/labyrinthine/models/commit';
import { CosmeticsListComponent } from 'app/features/others/labyrinthine/components/cosmetics-list/cosmetics-list.component';
import { CommitHistoryComponent } from 'app/features/others/labyrinthine/components/commit-history/commit-history.component';
import { CosmeticsCompareComponent } from 'app/features/others/labyrinthine/components/cosmetics-compare/cosmetics-compare.component';

@Component({
  selector: 'app-cosmetics',
  imports: [...sharedImports, ...sharedDeclarations, CosmeticsListComponent, CommitHistoryComponent, CosmeticsCompareComponent],
  templateUrl: './cosmetics.component.html'
})
export class CosmeticsComponent {
  private readonly cosmeticService = inject(CosmeticService);
  private readonly commitService = inject(CommitService);
  private readonly blobUrlService = inject(BlobUrlService);
  private readonly destroyRef = inject(DestroyRef);

  icons = {
    commit: f.faCheck,
    history: f.faHistory,
    compare: f.faCodeCompare,
  };

  readonly blobUrlScope = this.blobUrlService.createScope(this.destroyRef);
  readonly rawCosmetics = toSignal(this.cosmeticService.list(this.blobUrlScope), { initialValue: [] as Cosmetic[] });
  readonly commits = toSignal(this.commitService.list(), { initialValue: [] as Commit[] });
  readonly cosmetics = signal<Cosmetic[]>([]);
  readonly cosmeticEffect = effect(() => {
    const commits = this.commits();
    const cosmetics = this.rawCosmetics();
    const foundCosmetics = commits.flatMap(commit => commit.cosmetics);
    this.cosmetics.set(
      cosmetics.map(cosmetic =>
        foundCosmetics.find(foundCosmetic => CosmeticUtils.isSameCosmetic(cosmetic, foundCosmetic))
          ? { ...cosmetic, found: true }
          : cosmetic
      )
    );
  });

  isHistoryVisible = false;
  openHistory() {
    this.isHistoryVisible = true;
  }

  isCompareVisible = false;
  openCompare() {
    this.isCompareVisible = true;
  }

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
