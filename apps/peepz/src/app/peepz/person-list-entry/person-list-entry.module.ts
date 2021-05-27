import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PersonListEntryComponent } from './person-list-entry.component';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '../../material/material.module';

@NgModule({
  declarations: [PersonListEntryComponent],
  imports: [CommonModule, CommonModule, MaterialModule],
  exports: [PersonListEntryComponent],
})
export class PersonListEntryModule {}
