import { Component } from '@angular/core';

import { sharedImports } from 'app/shared/shared.config';

@Component({
  selector: 'app-commit-history',
  imports: [...sharedImports],
  templateUrl: './commit-history.component.html',
})
export class CommitHistoryComponent {
  commits = [
    {
      date: '2026-02-20T00:39:00.610Z',
      cosmetics: [
        { name: 'Golden Rose', type: 'Face' },
        { name: 'White Rose', type: 'Face' },
        { name: 'Red Rose', type: 'Face' },
        { name: 'Black Rose', type: 'Face' },
        { name: 'Blue Rose', type: 'Face' },
        { name: 'Orange Rose', type: 'Face' },
        { name: 'Pink Rose', type: 'Face' }
      ],
      id: 1
    },
    {
      date: '2026-02-20T00:28:23.574Z',
      cosmetics: [
        { name: 'Black Watch', type: 'Wrist' },
        { name: 'White Watch', type: 'Wrist' },
      ],
      id: 2
    },
    {
      date: '2026-02-20T00:23:09.994Z',
      cosmetics: [
        { name: 'Green Flashlight Bulky', type: 'Flashlight' },
        { name: 'Yellow Flashlight Bulky', type: 'Flashlight' },
        { name: 'Blue Flashlight Bulky', type: 'Flashlight' },
        { name: 'Red Flashlight Bulky', type: 'Flashlight' },
      ],
      id: 3
    },
    {
      date: '2026-02-20T00:45:09.427Z',
      cosmetics: [
        { name: 'Pentagram Glowstick', type: 'Glowsticks' },
        { name: 'Bone Glowstick', type: 'Glowsticks' },
        { name: 'Skull Glowstick', type: 'Glowsticks' },
      ],
      id: 4
    },
  ];

  formatDate(date: string): string {
    return Intl.DateTimeFormat('fr', { month: 'long', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(new Date(date));
  }
}
