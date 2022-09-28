import { Component, OnInit } from '@angular/core';
import { IUser } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
})
export class UsersListComponent implements OnInit {
  users: IUser[] = [];

  constructor(private firebase: FirebaseService) {}

  ngOnInit(): void {
    this.firebase.users.subscribe((users: IUser[]) => {
      this.users = users;
    });
  }
}
