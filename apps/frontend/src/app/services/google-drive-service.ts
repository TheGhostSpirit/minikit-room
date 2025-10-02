import { inject, Injectable } from '@angular/core';

import { GoogleAuthService } from 'app/services/google-auth-service';

@Injectable({
  providedIn: 'root'
})
export class GoogleDriveService {

  private readonly authService = inject(GoogleAuthService);

  async uploadFile(file: File): Promise<string> {
    const accessToken = this.authService.accessToken;

    const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=media', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': file.type,
        'Content-Length': file.size.toString()
      },
      body: file
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Upload failed: ${error}`);
    }

    return response.json();
  }

}
