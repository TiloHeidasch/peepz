import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '@peepz/api-interfaces';
import { UserService } from './user.service';

@Component({
  selector: 'peepz-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  constructor(
    private userService: UserService,
    private _snackBar: MatSnackBar
  ) {}
  user: User;
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
  newPassword = '';
  newUsername = '';

  ngOnInit(): void {
    this.user = this.userService.userValue;
    this.newUsername = this.user.username;
  }
  logout() {
    this.userService.logout();
  }
  changeUsername() {
    this.userService.changeUsername(this.newUsername).subscribe(
      (success) => {
        this._snackBar.open('Success - Redirecting to Login', 'OK', {
          duration: 3000,
        });
        setTimeout(() => {
          this.logout();
        }, 3000);
      },
      (error) => {
        console.error(error);

        this._snackBar.open(
          `Error - ${error.error.error}: ${error.error.message}`,
          'OK',
          { duration: 3000 }
        );
      }
    );
  }
  changePassword() {
    this.userService.changePassword(this.newPassword).subscribe(
      (success) => {
        this._snackBar.open('Success - Redirecting to Login', 'OK', {
          duration: 3000,
        });
        setTimeout(() => {
          this.logout();
        }, 3000);
      },
      (error) => {
        console.error(error);

        this._snackBar.open(
          `Error - ${error.error.error}: ${error.error.message}`,
          'OK',
          { duration: 3000 }
        );
      }
    );
  }
}
