import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

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

  constructor() {}

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
        email: new FormControl(null, [Validators.email, Validators.required]),
        password: new FormControl(null, [
          Validators.minLength(6),
          Validators.required,
        ]),
      }),
    });
  }

  takenNames(control: FormControl): { [s: string]: boolean } | null {
    if (this.takenUsernames.indexOf(control.value) !== -1) {
      return { usernameTaken: true };
    }

    return null;
  }

  onSubmit() {
    console.log(this.userForm);
  }
}
