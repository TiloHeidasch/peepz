import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonPageComponent } from './person-page.component';
import { DeletePersonDialog } from './delete-person-dialog/delete-person-dialog.component';
import { CharacteristicTreeComponent } from './characteristic-tree/characteristic-tree.component';
import { MaterialModule } from '../../material/material.module';
import { PersonPageRoutingModule } from './person-page-routing.module';
import { QuillModule } from 'ngx-quill';
import { CropImageDialog } from './crop-image-dialog/crop-image-dialog.component';
import { ImageCropperModule } from 'ngx-image-cropper';

@NgModule({
  declarations: [
    PersonPageComponent,
    DeletePersonDialog,
    CropImageDialog,
    CharacteristicTreeComponent,
  ],
  imports: [
    QuillModule.forRoot(),
    CommonModule,
    PersonPageRoutingModule,
    CommonModule,
    MaterialModule,
    ImageCropperModule,
  ],
  exports: [PersonPageComponent],
})
export class PersonPageModule {}
