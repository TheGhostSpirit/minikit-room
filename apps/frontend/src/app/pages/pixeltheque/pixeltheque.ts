import { Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pixeltheque',
  imports: [TableModule, ButtonModule, FontAwesomeModule, ToolbarModule],
  templateUrl: './pixeltheque.html',
  styleUrl: './pixeltheque.scss'
})
export class Pixeltheque {
  icons = {
    trash: faTrash,
    plus: faPlus,
  };

  games = [
    { name: 'PowerWashSimulator', achievements: 13 },
    { name: 'PowerWashSimulator', achievements: 13 },
    { name: 'PowerWashSimulator', achievements: 13 },
    { name: 'PowerWashSimulator', achievements: 13 },
    { name: 'PowerWashSimulator', achievements: 13 }
  ];
}
