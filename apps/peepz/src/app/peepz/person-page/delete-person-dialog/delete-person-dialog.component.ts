import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'peepz-delete-person-dialog',
  templateUrl: './delete-person-dialog.component.html',
  styleUrls: ['./delete-person-dialog.component.scss'],
})
export class DeletePersonDialog {
  test = '';
  constructor(
    public dialogRef: MatDialogRef<DeletePersonDialog>,
    @Inject(MAT_DIALOG_DATA) public name: string
  ) {}
  evaluate() {
    return this.test.trim() === ('Delete ' + this.name).trim();
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
