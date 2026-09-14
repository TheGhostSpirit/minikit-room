import { Component, computed, input } from '@angular/core';

import { sharedImports } from 'app/shared/shared.config';
import { Commit } from 'app/features/others/labyrinthine/models/commit';

@Component({
  selector: 'app-commit-history',
  imports: [...sharedImports],
  templateUrl: './commit-history.component.html',
})
export class CommitHistoryComponent {
  readonly commits = input<Commit[]>([]);
  readonly commitsByDateDesc = computed(() =>
    [...this.commits()].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  );

  formatDate(date: string): string {
    return Intl.DateTimeFormat('fr', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(date));
  }
}
