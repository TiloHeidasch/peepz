import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserComponent } from './user.component';
import { MaterialModule } from '../material/material.module';
import { UserRoutingModule } from './user-routing.module';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, MaterialModule, UserRoutingModule, HttpClientModule],
})
export class UserModule {}
