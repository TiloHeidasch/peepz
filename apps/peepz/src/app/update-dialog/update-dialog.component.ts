import { Component, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'peepz-update-dialog',
  templateUrl: './update-dialog.component.html',
  styleUrls: ['./update-dialog.component.scss'],
})
export class UpdateDialog {
  constructor(
    public dialogRef: MatDialogRef<UpdateDialog>,
    @Inject(MAT_DIALOG_DATA) public name: string
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
}
