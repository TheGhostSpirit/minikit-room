import { Component, input } from '@angular/core';

import { sharedImports } from 'app/shared/shared.config';
import { Commit } from 'app/features/others/labyrinthine/models/commit';

@Component({
  selector: 'app-commit-history',
  imports: [...sharedImports],
  templateUrl: './commit-history.component.html',
})
export class CommitHistoryComponent {
  readonly commits = input<Commit[]>([]);

  formatDate(date: string): string {
    return Intl.DateTimeFormat('fr', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(date));
  }
}
