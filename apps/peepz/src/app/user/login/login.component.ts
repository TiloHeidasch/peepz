import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { first, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'peepz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  returnUrl: string;
  constructor(
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute,
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

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/user';
    if (this.userService.userValue) {
      this.router.navigate([this.returnUrl]);
    }
  }
  login(event?) {
    if (event && event.keyCode !== 13) {
      return;
    }
    this.userService
      .login(this.username, this.password)
      .pipe(first())
      .subscribe({
        next: () => {
          this.router.navigate([this.returnUrl]);
        },
        error: (error) => {
          console.error(error);
          this._snackBar.open(`Error - ${error.message}`, 'OK');
        },
      });
  }
}
