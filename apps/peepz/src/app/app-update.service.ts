import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SwUpdate } from '@angular/service-worker';
import { UpdateDialog } from './update-dialog/update-dialog.component';
@Injectable({
  providedIn: 'root',
})
export class AppUpdateService {
  constructor(private readonly updates: SwUpdate, private dialog: MatDialog) {
    this.updates.available.subscribe((event) => {
      this.showAppUpdateAlert();
    });
  }
  showAppUpdateAlert() {
    const dialogRef = this.dialog.open(UpdateDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.doAppUpdate();
      }
    });
  }
  doAppUpdate() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }
}
