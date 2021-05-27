import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PeepzComponent } from './peepz.component';
import { PeepzRoutingModule } from './peepz-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { PersonListEntryModule } from './person-list-entry/person-list-entry.module';

@NgModule({
  declarations: [PeepzComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    MaterialModule,
    PersonListEntryModule,
    PeepzRoutingModule,
  ],
})
export class PeepzModule {}
