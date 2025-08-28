import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { SelectModule } from 'primeng/select';
import { DividerModule } from 'primeng/divider';
import { TextareaModule } from 'primeng/textarea';
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';
import { MenuModule } from 'primeng/menu';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  declarations: [],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    InputTextModule,
    FloatLabelModule,
    RatingModule,
    ButtonModule,
    SelectModule,
    DividerModule,
    TextareaModule,
    TableModule,
    ToolbarModule,
    FontAwesomeModule,
    MenuModule,
  ]
})
export class CommonModule { }
