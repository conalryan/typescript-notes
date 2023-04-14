import {RouterModule, Routes} from '@angular/router';
import {MyBootstrapComponent} from './my-bootstrap/my-bootstrap.component';
import {NgModule} from '@angular/core';
import {MyNgbComponent} from './my-ngb/my-ngb.component';
import {MyReactiveFormComponent} from './my-reactive-form/my-reactive-form.component';
import {MyTemplateFormComponent} from './my-template-form/my-template-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'bootstrap'
  },
  {
    path: 'bootstrap',
    component: MyBootstrapComponent
  },
  {
    path: 'ngbootstrap',
    component: MyNgbComponent
  },
  {
    path: 'reactiveform',
    component: MyReactiveFormComponent
  },
  {
    path: 'templateform',
    component: MyTemplateFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
