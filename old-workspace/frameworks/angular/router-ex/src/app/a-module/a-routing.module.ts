import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ParentComponent} from './container/parent.component';

const routes: Routes = [
  {
    path: 'parent',
    component: ParentComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ARoutingModule { }
