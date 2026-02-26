import { Injectable } from '@angular/core';

import { zlibSync, unzlibSync, strToU8, strFromU8 } from 'fflate';

@Injectable({
  providedIn: 'root',
})
export class ObjectCompressionService {

  compress(object: Object): string {
    const json = JSON.stringify(object);
    const bytes = strToU8(json);
    const compressedBytes = zlibSync(bytes);
    const compressedString = String.fromCharCode(...compressedBytes);
    return btoa(compressedString);
  }

  decompress<T>(compressed: string): T {
    const binaryString = atob(compressed);
    const bytes = new Uint8Array(
      [...binaryString].map(char => char.charCodeAt(0))
    );
    const decompressed = unzlibSync(bytes);
    const jsonString = strFromU8(decompressed);
    return JSON.parse(jsonString) as T;
  }

}
