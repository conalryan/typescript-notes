import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ImportsLazyComponent} from './imports-lazy.component';

const routes: Routes = [
  {
    path: 'imports-lazy',
    component: ImportsLazyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImportsLazyRoutingModule { }
