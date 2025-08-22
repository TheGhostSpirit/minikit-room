import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RatingModule } from 'primeng/rating';
import { StepperModule } from 'primeng/stepper';
import { ButtonModule } from 'primeng/button';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-edit-game',
  imports: [InputTextModule, FloatLabelModule, FormsModule, RatingModule, StepperModule, ButtonModule, FontAwesomeModule],
  templateUrl: './edit-game.html',
  styleUrl: './edit-game.scss'
})
export class EditGame {
  faArrowRight = faArrowRight;
  title = 'Modifier un jeu';

  name = '';
  rating = 2;
}
