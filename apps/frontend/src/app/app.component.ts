import { Component, inject } from '@angular/core';

import { LayoutComponent } from 'app/layout/components/layout/layout.component';
import { AutoSyncService } from 'app/core/services/sync/auto-sync.service';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent],
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly autoSyncService = inject(AutoSyncService);
}
