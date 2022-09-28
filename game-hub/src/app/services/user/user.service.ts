import { Injectable } from '@angular/core';
import { addDoc, collectionData, Firestore } from '@angular/fire/firestore';
import { collection } from '@firebase/firestore';
import { Observable } from 'rxjs';
import { IUser } from './user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usersRef = collection(this.firestore, 'users');

  private localUsers: IUser[] = [];

  constructor(private firestore: Firestore) {}

  getAllUsers(): Observable<IUser[]> {
    console.log('Firebase Request: getAllUsers!');

    return collectionData(this.usersRef, { idField: 'id' }) as Observable<
      IUser[]
    >;
  }

  getLocalUsers() {
    return this.localUsers.slice();
  }

  setLocalUsers(users: IUser[]) {
    this.localUsers = users;
    localStorage.setItem('users', JSON.stringify(users));
  }

  registerNewUser(newUser: IUser) {
    return addDoc(this.usersRef, newUser);
  }
}
