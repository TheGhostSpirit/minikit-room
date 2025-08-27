import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';

@Component({
  selector: 'app-edit-game',
  imports: [InputTextModule, FloatLabelModule, FormsModule, RatingModule, ButtonModule, SelectModule, DividerModule, TextareaModule],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.scss'
})
export class EditGame {
  title = 'Modifier un jeu';

  platforms = [
    'Xbox',
    'PlayStation',
    'PC'
  ];

  formats = [
    'Physique',
    'Dématérialisé'
  ];

  name = '';
  rating = 0;
  platform = '';
  format = '';
  studio = '';
  summary = '';
  comment = '';

}
