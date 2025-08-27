import { Component } from '@angular/core';

import * as f from '@fortawesome/free-solid-svg-icons';

import { CommonModule } from 'app/common-module';

@Component({
  selector: 'app-pixeltheque',
  imports: [CommonModule],
  templateUrl: './pixeltheque.html',
  styleUrl: './pixeltheque.scss'
})
export class Pixeltheque {
  icons = {
    trash: f.faTrash,
    plus: f.faPlus,
  };

  games = [
    { name: 'PowerWashSimulator', achievements: 13, id: 1 },
    { name: 'PowerWashSimulator', achievements: 13, id: 2 },
    { name: 'PowerWashSimulator', achievements: 13, id: 3 },
    { name: 'PowerWashSimulator', achievements: 13, id: 4 },
    { name: 'PowerWashSimulator', achievements: 13, id: 5 }
  ];
}
