import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MenuModule } from 'primeng/menu';

import { faPuzzlePiece, faGamepad, faVideo, faBook, faNoteSticky, faSkullCrossbones } from '@fortawesome/free-solid-svg-icons';
import { faSteam, faXbox } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-sidenav',
  imports: [MenuModule, FontAwesomeModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss'
})
export class Sidenav {

  items: MenuItem[] = [
    {
      label: 'Pixelthèque', items: [
        { label: 'Steam', fa: faSteam, disabled: true },
        { label: 'Xbox', fa: faXbox, disabled: true },
        { label: 'Autres', routerLink: 'pixeltheque', fa: faGamepad },
      ]
    },
    {
      label: 'Bibliothèque', items: [
        { label: 'Livres', fa: faBook, disabled: true },
        { label: 'Recettes', fa: faNoteSticky, disabled: true },
      ]
    },
    {
      label: 'Cinémathèque', items: [
        { label: 'Films', fa: faVideo, disabled: true },
      ]
    },
    {
      label: 'Ludothèque', items: [
        { label: 'Puzzles', fa: faPuzzlePiece, disabled: true },
        { label: 'Jeux objets cachés', fa: faSkullCrossbones, disabled: true },
      ]
    },
  ];

}
