import { AuthService } from './../services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, CanActivate } from '@angular/router';
import { AuthGuardService } from '../services/auth-guard.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  jwtToken: any;

  constructor(private auth: AuthService, private router: Router, private formBuilder: FormBuilder, private authGuard: AuthGuardService ) {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    if (this.auth.isLoggedIn()) {

      this.router.navigate(['/frigo']);

    }

  }

      login() {

        const username = this.loginForm.controls['username'].value.toLowerCase();

        this.auth.login(username, this.loginForm.controls['password'].value)
          .subscribe(
            success => {
              console.log(success);
              this.router.navigate(['/frigo']);
            },
            error => {
              console.log(error);
              this.errorMessage = 'username ou mot de passe incorrect';
            }
          );
  }
}
