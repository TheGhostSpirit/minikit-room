import { HttpContextToken } from '@angular/common/http';

export const USE_GOOGLE_AUTH = new HttpContextToken<boolean>(() => false);
