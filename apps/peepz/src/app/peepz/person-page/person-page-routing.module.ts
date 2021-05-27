import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonPageComponent } from './person-page.component';

const routes: Routes = [
  {
    path: '',
    component: PersonPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PersonPageRoutingModule {}
