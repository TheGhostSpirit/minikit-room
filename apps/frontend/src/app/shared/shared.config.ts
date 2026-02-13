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
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageModule } from 'primeng/image';
import { DynamicDialogModule, DialogService } from 'primeng/dynamicdialog';
import { MessageModule } from 'primeng/message';
import { ProgressBarModule } from 'primeng/progressbar';
import { DataViewModule } from 'primeng/dataview';
import { TagModule } from 'primeng/tag';
import { GalleriaModule } from 'primeng/galleria';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ImageUploadComponent } from 'app/shared/components/image-upload/image-upload.component';

export const sharedImports = [
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
  MenubarModule,
  AvatarModule,
  FileUploadModule,
  ImageModule,
  DynamicDialogModule,
  MessageModule,
  ProgressBarModule,
  DataViewModule,
  TagModule,
  GalleriaModule,
];

export const sharedDeclarations = [
  ImageUploadComponent,
];

export const sharedProviders = [
  DialogService,
];
