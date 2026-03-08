import { Routes } from '@angular/router';

import { GalleryComponent } from 'app/features/mediatheque/pages/gallery/gallery.component';
import { AlbumComponent } from 'app/features/mediatheque/pages/album/album.component';

export const routes: Routes = [
  { title: 'Galerie', path: 'gallery', component: GalleryComponent },
  { title: 'Album', path: 'album/:id', component: AlbumComponent },
];
