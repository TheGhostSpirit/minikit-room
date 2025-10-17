import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { USE_GOOGLE_AUTH } from 'app/core/tokens/use-google-auth.token';
import { DriveFile } from 'app/core/models/drive-file';

@Injectable({
  providedIn: 'root',
})
export class GoogleDriveService {

  private readonly httpClient = inject(HttpClient);

  private setupFileForTransfer(
    file: File | Blob,
    metadata: { name: string, mimeType: string, parents: string[] }
  ): FormData {
    const fileWithMetadata = new FormData();
    fileWithMetadata.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    fileWithMetadata.append('file', file);
    return fileWithMetadata;
  }

  uploadFile(file: File | Blob, name: string, folderId: string): Observable<unknown> {
    const fileWithMetadata = this.setupFileForTransfer(file, {
      name,
      mimeType: file.type,
      parents: [folderId]
    });

    return this.httpClient.post<unknown>(
      'https://www.googleapis.com/upload/drive/v3/files',
      fileWithMetadata,
      {
        context: new HttpContext().set(USE_GOOGLE_AUTH, true),
        params: {
          uploadType: 'multipart',
        }
      }
    );
  }

  listFilesInFolder(folderId: string): Observable<DriveFile[]> {
    return this.httpClient.get<{ files: DriveFile[] }>(
      'https://www.googleapis.com/drive/v3/files',
      {
        context: new HttpContext().set(USE_GOOGLE_AUTH, true),
        params: {
          q: `'${folderId}' in parents and trashed=false`
        }
      }
    ).pipe(
      map(res => res.files)
    );
  }

  downloadFile(id: string): Observable<Blob> {
    return this.httpClient.get(
      `https://www.googleapis.com/drive/v3/files/${id}`,
      {
        context: new HttpContext().set(USE_GOOGLE_AUTH, true),
        params: {
          alt: 'media',
        },
        responseType: 'blob',
      }
    );
  }

  createFolder(name: string): Observable<string> {
    return this.httpClient.post<{ id: string }>(
      `https://www.googleapis.com/drive/v3/files`,
      {
        name,
        mimeType: 'application/vnd.google-apps.folder'
      },
      { context: new HttpContext().set(USE_GOOGLE_AUTH, true) }
    ).pipe(
      map(res => res.id)
    );
  }

  findFolder(name: string): Observable<DriveFile | undefined> {
    return this.httpClient.get<{ files: DriveFile[] }>(
      'https://www.googleapis.com/drive/v3/files',
      {
        context: new HttpContext().set(USE_GOOGLE_AUTH, true),
        params: {
          q: `name='${name}' and mimeType='application/vnd.google-apps.folder' and trashed=false`
        }
      }
    ).pipe(
      map(res => res.files[0])
    );
  }

}
