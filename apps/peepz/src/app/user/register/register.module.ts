import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register.component';
import { RecaptchaModule } from 'ng-recaptcha';
import { RegisterRoutingModule } from './register-routing.module';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [RegisterComponent],
  imports: [
    CommonModule,
    RecaptchaModule,
    RegisterRoutingModule,
    MaterialModule,
  ],
})
export class RegisterModule {}
