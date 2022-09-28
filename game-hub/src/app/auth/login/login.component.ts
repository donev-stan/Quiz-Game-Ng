import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/services/firebase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePass: boolean = true;
  error: boolean = false;

  constructor(private firebase: FirebaseService, private router: Router) {}

  ngOnInit(): void {
    // Create form
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.firebase.login(this.loginForm.value).subscribe((data) => {
        if (!data.empty) {
          this.firebase.setLoggedUser(data.docs[0].id);
          this.router.navigate(['/home']);
        } else {
          this.error = true;
        }
      });
    }
  }
}
