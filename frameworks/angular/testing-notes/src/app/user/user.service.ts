import {Injectable} from '@angular/core';
import {User} from './user';

@Injectable()
export class UserService {

  user: User;
  isLoggedIn: boolean;

  constructor() {
  }

  set IsLoggedIn(bool: boolean) {
    this.isLoggedIn = bool;
  }

  get IsLoggedIn(): boolean {
    return this.isLoggedIn;
  }
}
