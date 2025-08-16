import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTrash, faPlus } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pixeltheque',
  imports: [TableModule, ButtonModule, FontAwesomeModule, ToolbarModule, InputTextModule, FloatLabelModule, RouterModule],
  templateUrl: './pixeltheque.html',
  styleUrl: './pixeltheque.scss'
})
export class Pixeltheque {
  icons = {
    trash: faTrash,
    plus: faPlus,
  };

  games = [
    { name: 'PowerWashSimulator', achievements: 13, id: 1 },
    { name: 'PowerWashSimulator', achievements: 13, id: 2 },
    { name: 'PowerWashSimulator', achievements: 13, id: 3 },
    { name: 'PowerWashSimulator', achievements: 13, id: 4 },
    { name: 'PowerWashSimulator', achievements: 13, id: 5 }
  ];
}
