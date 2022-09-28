import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../models/user';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  loggedUser: IUser | undefined;

  constructor(private firebase: FirebaseService, private router: Router) {
    this.loggedUser = this.firebase.isLoggedUser();
  }

  ngOnInit(): void {
    this.firebase.loggedUserNotification.subscribe((loggedInUser) => {
      this.loggedUser = loggedInUser;
    });
  }

  onLogout(): void {
    this.firebase.logout();
    this.router.navigate(['/home']);
  }
}
