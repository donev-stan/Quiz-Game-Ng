import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth/auth.service';
import { IUser } from '../services/user/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedUser: IUser | undefined;

  constructor(private authService: AuthService) {
    this.loggedUser = this.authService.getLoggedUser();
  }

  ngOnInit(): void {
    this.authService.loggedUserSubject.subscribe((loggedUser) => {
      this.loggedUser = loggedUser;
    });
  }
}
