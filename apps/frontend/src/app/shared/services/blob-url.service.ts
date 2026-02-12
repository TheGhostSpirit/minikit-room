import { DestroyRef, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlobUrlService {

  createScope(destroyRef?: DestroyRef): BlobUrlScope {
    const scope = new BlobUrlScope();

    if (destroyRef) {
      destroyRef.onDestroy(() => scope.cleanup());
    }

    return scope;
  }

}

export class BlobUrlScope {
  private readonly urls = new Set<string>();

  create(blob: Blob): string {
    const url = URL.createObjectURL(blob);
    this.urls.add(url);
    return url;
  }

  revoke(url: string): void {
    if (this.urls.has(url)) {
      URL.revokeObjectURL(url);
      this.urls.delete(url);
    }
  }

  cleanup(): void {
    for (const url of this.urls) {
      URL.revokeObjectURL(url);
    }
    this.urls.clear();
  }
}
