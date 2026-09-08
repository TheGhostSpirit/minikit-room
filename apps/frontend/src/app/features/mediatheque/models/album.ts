export interface AlbumImage {
  url?: string;
  data: File;
  legend: string;
}

export interface Album {
  id?: number;
  name: string;
  images: AlbumImage[];
}
