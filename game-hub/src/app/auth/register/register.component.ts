import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs';
import { IForbiddenUserData } from 'src/app/models/forbiddenUserData';
import { IRegisterData } from 'src/app/models/registerData';
import { IUser } from 'src/app/models/user';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  hidePass: boolean = true;

  takenUsernames = [''];
  takenEmails = [''];

  constructor(private firebase: FirebaseService, private router: Router) {
    firebase.users
      .pipe(
        map((users) =>
          users.map((user) => ({ username: user.username, email: user.email }))
        )
      )
      .subscribe((data) => {
        this.takenUsernames = [];
        this.takenEmails = [];

        data.forEach((user: IForbiddenUserData) => {
          this.takenUsernames.push(user.username);
          this.takenEmails.push(user.email);
        });
      });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      basicCredentials: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.validateTakenUsername.bind(this),
        ]),
      }),
      securityCredentials: new FormGroup({
        email: new FormControl(null, [
          Validators.email,
          Validators.required,
          this.validateTakenEmail.bind(this),
        ]),
        password: new FormControl(null, [
          Validators.minLength(6),
          Validators.required,
        ]),
      }),
    });
  }

  validateTakenUsername(control: FormControl): { [s: string]: boolean } | null {
    if (this.takenUsernames.indexOf(control.value) !== -1) {
      return { usernameTaken: true };
    }

    return null;
  }

  validateTakenEmail(control: FormControl): { [s: string]: boolean } | null {
    if (this.takenEmails.indexOf(control.value) !== -1) {
      return { emailTaken: true };
    }

    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      console.log(this.userForm.value);

      const newUser: IRegisterData = {
        username: this.userForm.value.basicCredentials.username,
        email: this.userForm.value.securityCredentials.email,
        password: this.userForm.value.securityCredentials.password,
      };

      this.firebase
        .register(newUser)
        .then((docData) => {
          this.firebase.getUserByID(docData.id).subscribe((user: IUser) => {
            this.firebase.setLoggedUser(user);
            this.router.navigate(['/home']);
          });
        })
        .catch((error) => console.error(error));
    }
  }

  preventSpace(event: { keyCode: number }): boolean {
    if (event.keyCode === 32) return false; // 32 is space key
    return true;
  }
}
