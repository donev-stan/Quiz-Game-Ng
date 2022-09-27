import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn: boolean = false;
  private loggedUser = null;

  constructor() {
    const loggedUser = JSON.parse(localStorage.getItem('loggeduser')!);

    if (loggedUser) {
      this.loggedIn = true;
      this.loggedUser = loggedUser;
    }
  }

  isLoggedIn(): boolean {
    return true;
  }

  login(): void {}

  register(): void {}
}
