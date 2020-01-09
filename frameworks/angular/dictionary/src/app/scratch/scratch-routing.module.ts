import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ParentComponent} from './parent.component';

const routes: Routes = [{
  path: 'scratch',
  component: ParentComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScratchRoutingModule { }
