import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params } from '@angular/router';
import { IUser } from '../models/user';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  hidePass: boolean = true;

  takenUsernames = ['Stan'];
  takenEmails = ['stan@gmail.com'];

  editMode: boolean = false;

  id!: string;

  constructor(
    private route: ActivatedRoute,
    private firebase: FirebaseService
  ) {}

  ngOnInit(): void {
    // Retrieve Route Parameters
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      this.firebase.getUserByID(this.id).subscribe((user: IUser) => {
        this.createForm(user);

        console.log();
      });
    });
  }

  createForm(userData: IUser): void {
    this.userForm = new FormGroup({
      avatar: new FormControl(
        {
          value: userData.avatar?.split('/').reverse()[0],
          disabled: !this.editMode,
        },
        [Validators.required]
      ),
      username: new FormControl(
        { value: userData.username, disabled: !this.editMode },
        [Validators.required, this.validateTakenUsername.bind(this)]
      ),
      email: new FormControl(
        { value: userData.email, disabled: !this.editMode },
        [
          Validators.email,
          Validators.required,
          this.validateTakenEmail.bind(this),
        ]
      ),
      password: new FormControl(
        { value: userData.password, disabled: !this.editMode },
        [Validators.minLength(6), Validators.required]
      ),
      repeatedPassword: new FormControl(
        { value: userData.password, disabled: !this.editMode },
        [
          this.validateRepeadedPassword.bind(this),
          Validators.minLength(6),
          Validators.required,
        ]
      ),
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

  validateRepeadedPassword(
    control: FormControl
  ): { [s: string]: boolean } | null {
    if (control.value !== this.userForm.controls['password'].value) {
      return { passwordsDontMatch: true };
    }

    return null;
  }

  onSubmit() {
    console.log(this.userForm.value);
  }
}
