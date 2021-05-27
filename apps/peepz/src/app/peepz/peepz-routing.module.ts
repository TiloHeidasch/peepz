import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../auth.guard';
import { PeepzComponent } from './peepz.component';

const routes: Routes = [
  {
    path: '',
    component: PeepzComponent,
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    loadChildren: () =>
      import('./person-page/person-page.module').then(
        (m) => m.PersonPageModule
      ),
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PeepzRoutingModule {}
