import { Injectable, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { IloginData } from 'src/app/auth/login/loginData';
import { IUser } from '../user/user';
import { UserService } from '../user/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnInit {
  private loggedUser: IUser | undefined;
  loggedUserSubject: Subject<IUser> = new Subject();

  constructor(private userService: UserService) {
    const loggedUser = JSON.parse(localStorage.getItem('loggedUser')!);

    if (loggedUser) {
      this.loggedUser = loggedUser;
      this.loggedUserSubject.next(loggedUser);
    }
  }

  ngOnInit(): void {}

  getLoggedUser(): IUser | undefined {
    return this.loggedUser;
  }

  login(loginData: IloginData) {
    this.userService.getAllUsers().subscribe((users: IUser[]) => {
      const foundUser = users.find(
        (user: IUser) =>
          user.email === loginData.email && user.password === loginData.password
      );

      if (foundUser) {
        this.loggedUser = foundUser;
        this.loggedUserSubject.next(foundUser);
        localStorage.setItem('loggedUser', JSON.stringify(foundUser));
      }

      const localUsers = users.map((user: IUser) => ({
        id: user.id,
        avatar: user.avatar,
        username: user.username,
        email: user.email,
      }));

      this.userService.setLocalUsers(localUsers);
    });
  }

  logout(): void {
    this.loggedUser = undefined;
    localStorage.removeItem('loggedUser');
  }

  register(registerData: any) {
    const { basicCredentials, securityCredentials } = registerData;

    const newUser = {
      avatar: `https://robohash.org/${basicCredentials.username}`,
      username: basicCredentials.username,
      email: securityCredentials.email,
      password: securityCredentials.password,
    };

    return this.userService
      .registerNewUser(newUser)
      .then((data) => {
        console.log(data);
        this.login(newUser);
      })
      .catch((error) => console.error(error));
  }
}
