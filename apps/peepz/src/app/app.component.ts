import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AppUpdateService } from './app-update.service';
import { CryptoService } from './crypto.service';
import { DecryptDialog } from './decrypt-dialog/decrypt-dialog.component';

@Component({
  selector: 'peepz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  navElements: {
    icon: string;
    title: string;
    link: string;
  }[] = [
    {
      icon: 'groups',
      title: 'Peepz',
      link: 'peepz',
    },
    {
      icon: 'account_circle',
      title: 'User',
      link: 'user',
    },
  ];

  constructor(
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher,
    public cryptoService: CryptoService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private appUpdate: AppUpdateService
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 980px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  crypt() {
    if (this.cryptoService.isEncrypted()) {
      const dialogRef = this.dialog.open(DecryptDialog);

      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
          this.cryptoService.unlock(result);
          this._snackBar.open('Unlocked', 'OK', { duration: 1000 });
        }
      });
    } else {
      this.cryptoService.lock();
      this._snackBar.open('Locked', 'OK', { duration: 1000 });
    }
  }
  async ngOnInit() {}
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
}
