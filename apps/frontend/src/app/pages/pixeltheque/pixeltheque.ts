import { Component } from '@angular/core';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-pixeltheque',
  imports: [TableModule, ButtonModule],
  templateUrl: './pixeltheque.html',
  styleUrl: './pixeltheque.scss'
})
export class Pixeltheque {
  games = [
    { name: 'PowerWashSimulator', achievements: 13 },
    { name: 'PowerWashSimulator', achievements: 13 },
    { name: 'PowerWashSimulator', achievements: 13 },
    { name: 'PowerWashSimulator', achievements: 13 },
    { name: 'PowerWashSimulator', achievements: 13 }
  ];
}
