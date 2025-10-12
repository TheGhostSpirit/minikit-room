import { HttpClient, HttpContext } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { USE_GOOGLE_AUTH } from 'app/core/tokens/use-google-auth.token';
import { DriveFile } from 'app/core/models/drive-file';

@Injectable({
  providedIn: 'root',
})
export class GoogleDriveService {

  private readonly httpClient = inject(HttpClient);

  private setupFileForTransfer(
    file: File | Blob,
    metadata: { name: string, mimeType: string }
  ): FormData {
    const fileWithMetadata = new FormData();
    fileWithMetadata.append(
      'metadata',
      new Blob([JSON.stringify(metadata)], { type: 'application/json' })
    );
    fileWithMetadata.append('file', file);
    return fileWithMetadata;
  }

  uploadFile(file: File | Blob, name: string): Observable<unknown> {
    const fileWithMetadata = this.setupFileForTransfer(file, {
      name: name,
      mimeType: file.type,
    });

    return this.httpClient.post<unknown>(
      'https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart',
      fileWithMetadata,
      { context: new HttpContext().set(USE_GOOGLE_AUTH, true) }
    ).pipe(
      catchError(err => { throw `Upload failed: ${err}`; })
    );
  }

  listFiles(): Observable<DriveFile[]> {
    return this.httpClient.get<{ files: DriveFile[] }>(
      'https://www.googleapis.com/drive/v3/files',
      { context: new HttpContext().set(USE_GOOGLE_AUTH, true) }
    ).pipe(
      map(res => res.files)
    );
  }

  downloadFile(id: string): Observable<Blob> {
    return this.httpClient.get<object>(
      `https://www.googleapis.com/drive/v3/files/${id}?alt=media`,
      { context: new HttpContext().set(USE_GOOGLE_AUTH, true) }
    ).pipe(
      map(data => new Blob([JSON.stringify(data)], { type: 'application/json' }))
    );
  }

}
