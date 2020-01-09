import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MyLifecycleHooksComponent} from './my-lifecycle-hooks.component';

const routes: Routes = [
  {
    path: 'lifecycle-hooks',
    component: MyLifecycleHooksComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyLifecycleHooksRoutingModule { }
