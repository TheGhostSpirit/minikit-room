import { User } from 'app/core/models/user';

export class GoogleUser {
  name = '';
  email = '';
  picture = '';

  static fromObject(source: unknown): GoogleUser {
    return Object.assign(new GoogleUser(), source);
  }

  convertToGenericUser(): User {
    return this as User;
  }
}
