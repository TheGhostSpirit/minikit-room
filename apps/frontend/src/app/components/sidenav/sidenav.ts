import { Component } from '@angular/core';

import { MenuItem } from 'primeng/api';

import * as f from '@fortawesome/free-solid-svg-icons';
import * as fb from '@fortawesome/free-brands-svg-icons';

import { CommonModule } from 'app/common-module';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule],
  templateUrl: './sidenav.html',
  styleUrl: './sidenav.scss'
})
export class Sidenav {

  items: MenuItem[] = [
    {
      label: 'Pixelthèque', items: [
        { label: 'Steam', fa: fb.faSteam, disabled: true },
        { label: 'Xbox', fa: fb.faXbox, disabled: true },
        { label: 'Autres', routerLink: 'pixeltheque', fa: f.faGamepad },
      ]
    },
    {
      label: 'Bibliothèque', items: [
        { label: 'Livres', fa: f.faBook, disabled: true },
        { label: 'Recettes', fa: f.faPizzaSlice, disabled: true },
      ]
    },
    {
      label: 'Cinémathèque', items: [
        { label: 'Films', fa: f.faVideo, disabled: true },
      ]
    },
    {
      label: 'Ludothèque', items: [
        { label: 'Puzzles', fa: f.faPuzzlePiece, disabled: true },
        { label: 'Jeux objets cachés', fa: f.faSkullCrossbones, disabled: true },
      ]
    },
    {
      label: 'Médiathèque', items: [
        { label: 'Notes', fa: f.faNoteSticky, disabled: true },
        { label: 'Galerie', fa: f.faPhotoFilm, disabled: true },
      ]
    },
  ];

}
