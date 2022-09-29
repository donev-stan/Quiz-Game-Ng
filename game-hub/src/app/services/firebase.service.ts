import { Injectable } from '@angular/core';
import { filter, map, Observable, Subject, tap } from 'rxjs';
import { IloginData } from '../models/loginData';
import { IUser } from '../models/user';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collection, doc, onSnapshot, query } from '@angular/fire/firestore';
import { IRegisterData } from '../models/registerData';
import { IForbiddenUserData } from '../models/forbiddenUserData';

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  loggedUserNotification: Subject<IUser | undefined> = new Subject();
  users: Observable<IUser[]>;

  constructor(private firestore: AngularFirestore) {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser')!);

    this.users = firestore
      .collection('users')
      .valueChanges({ idField: 'id' })
      .pipe(
        tap((data) => console.log(data)),
        tap((users: any) => {
          if (loggedInUser) {
            const user = users.find(
              (user: IUser) => user.id === loggedInUser.id
            );

            if (user) this.setLoggedUser(user);
          }
        })
      );
  }

  isLoggedUser() {
    return JSON.parse(localStorage.getItem('loggedInUser')!);
  }

  login(loginData: IloginData) {
    // const matchData = (user: IUser) =>
    //   user.email === loginData.email && user.password === loginData.password;

    // this.users
    //   .pipe(
    //     map((users: IUser[]) => users.filter((user: IUser) => matchData(user)))
    //   )
    //   .subscribe(([logInUser]) => {
    //     if (logInUser) this.setLoggedUser(logInUser);
    //     else this.loggedUserNotification.next(undefined);
    //   });

    return this.firestore
      .collection('users', (ref) =>
        ref
          .where('email', '==', `${loginData.email}`)
          .where('password', '==', `${loginData.password}`)
      )
      .get();
  }

  setLoggedUser(userData: IUser | string): void {
    const setUser = (userData: IUser) => {
      this.loggedUserNotification.next(userData);
      localStorage.setItem('loggedInUser', JSON.stringify(userData));
    };

    if (typeof userData === 'string') {
      this.getUserByID(userData).subscribe((user: IUser) => {
        setUser(user);
      });
    } else {
      setUser(userData);
    }
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    this.loggedUserNotification.next(undefined);
  }

  register(registerData: IRegisterData) {
    registerData.avatar = `https://robohash.org/${registerData.username}`;
    return this.firestore.collection('users').add(registerData);
  }

  getUserByID(userId: string): Observable<IUser> {
    return this.firestore
      .collection('users')
      .doc(userId)
      .valueChanges({ idField: 'id' })
      .pipe(tap((user: any) => console.log(user)));
  }

  getForbiddenData(): Observable<IForbiddenUserData[]> {
    return this.users.pipe(
      map((users) =>
        users.map((user) => ({ username: user.username, email: user.email }))
      )
    );
  }

  updateUser(userId: string, newUserData: IUser): Promise<any> {
    newUserData.avatar = `https://robohash.org/${newUserData.avatar}`;
    delete newUserData.repeatedPassword;

    return this.firestore.collection('users').doc(userId).set(newUserData);
  }

  deleteUser(userId: string): Promise<any> {
    return this.firestore.collection('users').doc(userId).delete();
  }
}
