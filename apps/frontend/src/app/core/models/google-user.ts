import { User } from 'app/core/models/user';

export class GoogleUser {
  name: string = '';
  email: string = '';
  picture: string = '';

  static fromObject(source: unknown): GoogleUser {
    return Object.assign(new GoogleUser(), source);
  }

  convertToGenericUser(): User {
    return this as User;
  }
}
