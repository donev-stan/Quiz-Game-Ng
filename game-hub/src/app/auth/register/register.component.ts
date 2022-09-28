import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { IUser } from 'src/app/services/user/user';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm!: FormGroup;
  allowSkip: boolean = false;
  hidePass: boolean = true;

  takenUsernames = ['Stan'];
  takenEmails = ['stan@gmail.com'];

  editMode: boolean = false;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {
    // this.userService.getAllUsers().subscribe((users: IUser[]) => {
    //   this.takenUsernames.push(...users.map((user: IUser) => user.username));
    //   this.takenEmails.push(...users.map((user: IUser) => user.email));
    // });
  }

  ngOnInit(): void {
    this.userForm = new FormGroup({
      basicCredentials: new FormGroup({
        username: new FormControl(null, [
          Validators.required,
          this.takenNames.bind(this),
        ]),
        // pets: new FormArray([]),
      }),
      securityCredentials: new FormGroup({
        email: new FormControl(null, [
          Validators.email,
          Validators.required,
          this.takenMails.bind(this),
        ]),
        password: new FormControl(null, [
          Validators.minLength(6),
          Validators.required,
        ]),
      }),
    });

    this.authService.loggedUserSubject.subscribe((loggedInUser) => {
      if (loggedInUser) this.router.navigate(['/home']);
    });
  }

  takenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.takenUsernames.indexOf(control.value) !== -1) {
      return { usernameTaken: true };
    }

    return null;
  }

  takenMails(control: FormControl): { [s: string]: boolean } | null {
    if (this.takenEmails.indexOf(control.value) !== -1) {
      return { emailTaken: true };
    }

    return null;
  }

  onSubmit() {
    if (this.userForm.valid) {
      this.authService.register(this.userForm.value);
    }
  }
}
