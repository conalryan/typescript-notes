import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HttpExComponent} from './http-ex.component';

const routes: Routes = [
  {
    path: '',
    component: HttpExComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HttpExRoutingModule { }
