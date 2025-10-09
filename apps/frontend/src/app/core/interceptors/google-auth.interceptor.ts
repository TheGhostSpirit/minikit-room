import { HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';

import { GoogleAuthService } from 'app/core/services/google/google-auth.service';
import { USE_GOOGLE_AUTH } from 'app/core/tokens/use-google-auth.token';

export const googleAuthInterceptor = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
) => {
  const shouldUseAuth = req.context.get(USE_GOOGLE_AUTH);

  if (!shouldUseAuth) {
    return next(req);
  }

  const authToken = inject(GoogleAuthService).accessToken;

  const newReq = req.clone({
    headers: req.headers.append('Authorization', `Bearer ${authToken}`),
  });

  return next(newReq);
};
