import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  private encrypted = true;
  private password = '';
  constructor(private _snackBar: MatSnackBar) {}
  lock() {
    this.password = '';
    this.encrypted = true;
  }
  unlock(password: string) {
    this.password = password;
    this.encrypted = false;
  }
  isEncrypted(): boolean {
    return this.encrypted;
  }

  encrypt(data: string): string {
    if (!data || data === '') {
      return '';
    }
    return CryptoJS.AES.encrypt(data.trim(), this.password.trim()).toString();
  }
  decrypt(data: string): string {
    if (!data || data === '') {
      return '';
    }
    try {
      return CryptoJS.AES.decrypt(data.trim(), this.password.trim()).toString(
        CryptoJS.enc.Utf8
      );
    } catch (error) {
      this._snackBar.open('Decryption Failed - locking crypt', 'OK', {
        duration: 3000,
      });
      this.lock();
    }
    return '';
  }
}
