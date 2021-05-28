import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'peepz-crop-image-dialog',
  templateUrl: './crop-image-dialog.component.html',
  styleUrls: ['./crop-image-dialog.component.scss'],
})
export class CropImageDialog {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  constructor(
    public dialogRef: MatDialogRef<CropImageDialog>,
    @Inject(MAT_DIALOG_DATA) public name: string
  ) {}

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    compressImage(event.base64, 128, 128).then((compressed) => {
      this.croppedImage = compressed;
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
}
function compressImage(src, newX, newY) {
  return new Promise((res, rej) => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      const elem = document.createElement('canvas');
      elem.width = newX;
      elem.height = newY;
      const ctx = elem.getContext('2d');
      ctx.drawImage(img, 0, 0, newX, newY);
      const data = ctx.canvas.toDataURL();
      res(data);
    };
    img.onerror = (error) => rej(error);
  });
}
