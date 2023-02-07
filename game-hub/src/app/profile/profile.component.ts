import { Dialog } from '@angular/cdk/dialog';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, tap } from 'rxjs';
import { IForbiddenUserData } from '../models/forbiddenUserData';
import { IUser } from '../models/user';
import { FirebaseService } from '../services/firebase.service';
import { DialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  userForm!: FormGroup;
  hidePass: boolean = true;

  takenUsernames = [''];
  takenEmails = [''];

  editMode: boolean = false;

  user!: IUser;
  id!: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebase: FirebaseService,
    public dialog: Dialog
  ) {}

  ngOnInit(): void {
    // Retrieve Route Parameters
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];

      // Get LoggedInUser
      this.firebase.getUserByID(this.id).subscribe((user: IUser) => {
        this.user = user;
        this.createForm(user);

        // Check if we are in EDIT MODE
        if (this.route.routeConfig!.path === 'profile-edit/:id') {
          this.editMode = true;

          // Get ForbiddenData
          this.firebase
            .getForbiddenData()
            .pipe(
              map((data: IForbiddenUserData[]) => {
                return data.filter(
                  (data: IForbiddenUserData) =>
                    data.email !== this.user.email &&
                    data.username !== this.user.username
                );
              })
            )
            .subscribe((data) => {
              this.takenUsernames = [];
              this.takenEmails = [];

              data.forEach((user: IForbiddenUserData) => {
                this.takenUsernames.push(user.username);
                this.takenEmails.push(user.email);
              });
            });
        } else {
          // If not in edit mode - disable inputs
          this.disableInputs(this.editMode);
        }
      });
    });
  }

  createForm(userData: IUser): void {
    this.userForm = new FormGroup({
      avatar: new FormControl(userData.avatar?.split('/').reverse()[0], [
        Validators.required,
      ]),
      username: new FormControl(userData.username, [
        Validators.required,
        this.validateTakenUsername.bind(this),
      ]),
      email: new FormControl(userData.email, [
        Validators.required,
        Validators.email,
        this.validateTakenEmail.bind(this),
      ]),
      password: new FormControl(userData.password, [
        Validators.required,
        Validators.minLength(6),
      ]),
      repeatedPassword: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
        this.validateRepeadedPassword.bind(this),
      ]),
    });
  }

  disableInputs(editMode: boolean): void {
    if (!editMode) {
      this.userForm.get('username')?.disable();
      this.userForm.get('avatar')?.disable();
      this.userForm.get('email')?.disable();
      this.userForm.get('password')?.disable();
      this.userForm.get('repeatedPassword')?.disable();
    }
  }

  validateTakenUsername(control: FormControl): { [s: string]: boolean } | null {
    if (this.takenUsernames.indexOf(control.value) !== -1) {
      return { usernameTaken: true };
    }

    return null;
  }

  validateTakenEmail(control: FormControl): { [s: string]: boolean } | null {
    if (this.takenEmails?.indexOf(control.value) !== -1) {
      return { emailTaken: true };
    }

    return null;
  }

  validateRepeadedPassword(
    control: FormControl
  ): { [s: string]: boolean } | null {
    if (control.value !== this.userForm?.controls['password']?.value) {
      return { passwordsDontMatch: true };
    }

    return null;
  }

  onSubmit() {
    if (this.userForm.valid && this.validateChanges()) {
      this.firebase.updateUser(this.id, this.userForm.value).then((data) => {
        this.router.navigate(['/profile', this.id]);
      });
    }
  }

  validateChanges(): boolean {
    if (
      this.user.avatar!.split('/').reverse()[0] !==
        this.userForm?.controls['avatar']?.value ||
      this.user.username !== this.userForm?.controls['username']?.value ||
      this.user.password !== this.userForm?.controls['password']?.value ||
      this.user.email !== this.userForm?.controls['email']?.value
    ) {
      return true;
    }
    return false;
  }

  onLogout(): void {
    this.firebase.logout();
    this.router.navigate(['/home']);

    // this.dialog.open(DialogComponent, {
    //   disableClose: true,
    //   data: {
    //     title: 'Log out',
    //     text: 'Are you sure you want to log out?',
    //     actions: {
    //       main: {
    //         text: 'Log out',
    //         action: 'logout',
    //       },
    //       secondary: {
    //         text: 'Cancel',
    //         action: 'cancel',
    //       },
    //     },
    //   },
    // });
  }

  onDelete(): void {
    this.firebase.deleteUser(this.id).then((data) => {
      if (data) {
        this.router.navigate(['/home']);
        this.firebase.logout();
      }
    });

    // this.dialog.open(DialogComponent, {
    //   disableClose: true,
    //   data: {
    //     title: 'Delete User',
    //     text: 'Are you sure you want to delete your profile?',
    //     actions: {
    //       main: {
    //         text: 'Delete',
    //         action: 'delete',
    //         deleteId: this.id,
    //       },
    //       secondary: {
    //         text: 'Cancel',
    //         action: 'cancel',
    //       },
    //     },
    //   },
    // });
  }
}
