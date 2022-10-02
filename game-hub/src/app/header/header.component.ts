import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/user';
import { FirebaseService } from '../services/firebase.service';
import { SidenavService } from '../services/sidenav.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedUser: IUser | undefined;

  screenWidth!: number;

  constructor(
    private firebase: FirebaseService,
    private sidenav: SidenavService
  ) {
    this.loggedUser = this.firebase.isLoggedUser();
  }

  ngOnInit(): void {
    this.firebase.loggedUserNotification.subscribe((loggedInUser) => {
      this.loggedUser = loggedInUser;
    });

    this.screenWidth = window.innerWidth;
  }

  toggleSidenav(): void {
    if (this.screenWidth < 768) {
      this.sidenav.toggle();
    }
  }
}
