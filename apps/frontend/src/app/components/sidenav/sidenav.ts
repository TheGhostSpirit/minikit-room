import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-sidenav',
  imports: [MenuModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss'
})
export class Sidenav {

  items: MenuItem[] = [
    { label: 'Pixelthèque', items: [
        { label: 'Steam' },
        { label: 'Xbox' },
        { label: 'Autres', routerLink: 'pixeltheque' },
      ]
    },
    { label: 'Bibliothèque' },
    { label: 'Cinémathèque' },
    { label: 'Ludothèque' },
    { label: 'Armoire' },
    { label: 'Livre de recettes' },
  ];

}
