import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'peepz-decrypt-dialog',
  templateUrl: './decrypt-dialog.component.html',
  styleUrls: ['./decrypt-dialog.component.scss'],
})
export class DecryptDialog {
  hidePassword = true;
  passwordFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
  ]);

  getPasswordErrorMessage() {
    if (this.passwordFormControl.hasError('required')) {
      return 'You must enter a password';
    }
    if (this.passwordFormControl.hasError('minlength')) {
      return 'You must enter atleast 8 characters';
    }
    return '';
  }
  constructor(
    public dialogRef: MatDialogRef<DecryptDialog>,
    @Inject(MAT_DIALOG_DATA) public name: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
