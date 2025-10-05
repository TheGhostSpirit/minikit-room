import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { GoogleAuthService } from 'app/services/google-auth-service';


@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  private readonly authService = inject(GoogleAuthService);
  private readonly httpClient = inject(HttpClient)

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
      {
        headers: {
          Authorization: `Bearer ${this.authService.accessToken}`,
        },
      }
    ).pipe(
      catchError(err => { throw `Upload failed: ${err}`; })
    );
  }

}
