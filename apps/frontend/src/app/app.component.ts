import { Component, inject } from '@angular/core';

import { ToastModule } from 'primeng/toast';

import { LayoutComponent } from 'app/layout/components/layout/layout.component';
import { AutoSyncService } from 'app/core/services/sync/auto-sync.service';
import { ThemeService } from 'app/core/services/theme/theme.service';

@Component({
  selector: 'app-root',
  imports: [LayoutComponent, ToastModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  readonly autoSyncService = inject(AutoSyncService);
  readonly themeService = inject(ThemeService);
}
