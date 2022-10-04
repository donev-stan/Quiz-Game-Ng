import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  private returnUrl: string = '/home';

  constructor(
    private firebase: FirebaseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Create form
    this.loginForm = new FormGroup({
      email: new FormControl(null, [Validators.email, Validators.required]),
      password: new FormControl(null, [
        Validators.minLength(6),
        Validators.required,
      ]),
    });

    this.returnUrl = this.route.snapshot.queryParams['returnUrl'];
  }

  onSubmit() {
    this.trimData();

    if (this.loginForm.valid) {
      this.firebase.login(this.loginForm.value).subscribe((data) => {
        if (!data.empty) {
          this.firebase.setLoggedUser(data.docs[0].id);
          this.router.navigateByUrl(this.returnUrl);
        } else {
          this.error = true;
        }
      });
    }
  }

  trimData(): void {
    // Trim email
    this.loginForm
      .get('email')
      ?.patchValue(this.loginForm.get('email')!.value.trim());

    // Trim password
    this.loginForm
      .get('password')
      ?.patchValue(this.loginForm.get('password')!.value.trim());
  }
}
