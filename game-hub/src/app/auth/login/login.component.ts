import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  hidePass: boolean = true;
  error: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Create form
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
    });

    // if logged user - navigate to home page
    if (this.authService.getLoggedUser()) this.router.navigate(['/home']);

    this.authService.loggedUserSubject.subscribe((loggedInUser) => {
      if (loggedInUser) this.router.navigate(['/home']);
      else this.error = true;
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value);
    }
  }
}
