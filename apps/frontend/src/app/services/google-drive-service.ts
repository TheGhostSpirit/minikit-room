import { inject, Injectable } from '@angular/core';

import { GoogleAuthService } from 'app/services/google-auth-service';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  private readonly authService = inject(GoogleAuthService);

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

  async uploadFile(file: File | Blob, name: string): Promise<string> {
    const fileWithMetadata = this.setupFileForTransfer(file, {
      name: name,
      mimeType: file.type,
    });

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.authService.accessToken}`,
      },
      body: fileWithMetadata,
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Upload failed: ${error}`);
    }

    return response.json();
  }

}
