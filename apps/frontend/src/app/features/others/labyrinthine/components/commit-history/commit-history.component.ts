import { Component } from '@angular/core';

import { sharedImports } from 'app/shared/shared.config';

@Component({
  selector: 'app-commit-history',
  imports: [...sharedImports],
  templateUrl: './commit-history.component.html',
})
export class CommitHistoryComponent {}
