import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { environment } from 'apps/peepz/src/environments/environment';
import { UserService } from '../user.service';

@Component({
  selector: 'peepz-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  captcha = undefined;
  captchaSecret = environment.production
    ? '6LeVzNEaAAAAALzTL14ZKpNJB9o4V799nAuDqtCl'
    : '6Ld9-NIaAAAAAKyJtGklUT0NwGU8U7P9DhJ1XAT0';
  constructor(
    private router: Router,
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}
  usernameFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(64),
  ]);
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  getUsernameErrorMessage() {
    if (this.usernameFormControl.hasError('required')) {
      return 'You must enter a username';
    }
    if (this.usernameFormControl.hasError('minlength')) {
      return 'You must enter atleast 4 characters';
    }
    if (this.usernameFormControl.hasError('maxlength')) {
      return 'You must enter less than 64 characters';
    }
    return '';
  }
  getPasswordErrorMessage() {
    if (this.passwordFormControl.hasError('required')) {
      return 'You must enter a password';
    }
    if (this.passwordFormControl.hasError('minlength')) {
      return 'You must enter atleast 8 characters';
    }
    return '';
  }

  hidePassword = true;
  password = '';
  username = '';

  ngOnInit(): void {}
  resolved(event) {
    this.captcha = event;
  }

  register() {
    this.userService
      .register(this.username, this.password, this.captcha)
      .subscribe({
        next: (data) => {
          this._snackBar.open('Success - Redirecting to login', 'OK', {
            duration: 3000,
          });
          setTimeout(() => {
            this.router.navigate(['/user/login']);
          }, 1000);
        },
        error: (error) => {
          console.error(error);
          this._snackBar.open("That didn't work", 'Retry', { duration: 3000 });
        },
      });
  }
}
