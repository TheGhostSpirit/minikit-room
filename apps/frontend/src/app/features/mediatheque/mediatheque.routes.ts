import { Routes } from '@angular/router';

import { GalleryComponent } from 'app/features/mediatheque/pages/gallery/gallery.component';
import { AlbumComponent } from 'app/features/mediatheque/pages/album/album.component';
import { EditAlbumComponent } from 'app/features/mediatheque/pages/edit-album/edit-album.component';

export const routes: Routes = [
  { title: 'Galerie', path: 'gallery', component: GalleryComponent },
  { title: 'Album', path: 'album/:id', component: AlbumComponent },
  { title: 'Editer un album', path: 'album/:id/edit', component: EditAlbumComponent },
];
