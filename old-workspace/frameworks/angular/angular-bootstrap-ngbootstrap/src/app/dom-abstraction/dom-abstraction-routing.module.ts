import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {MyHostElementComponent} from './host-element/my-host-element.component';
import {MyTemplateRefComponent} from './view-child/template-ref/my-template-ref.component';
import {MyElementRefComponent} from './view-child/element-ref/my-element-ref.component';
import {MyViewContainerRefComponent} from './view-child/view-container-ref/my-view-container-ref.component';
import {MyViewRefComponent} from './view-child/view-ref/my-view-ref.component';

const routes: Routes = [
  /* TODO: Make this a parent and child routes {
    path: 'dom-abstraction',
    pathMatch: 'full',
    redirectTo: 'view-child'
  },*/
  {
    path: 'host-element',
    component: MyHostElementComponent
  },
  {
    path: 'element-ref',
    component: MyElementRefComponent
  },
  {
    path: 'template-ref',
    component: MyTemplateRefComponent
  },
  {
    path: 'view-container',
    component: MyViewContainerRefComponent
  },
  {
    path: 'view-ref',
    component: MyViewRefComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomAbstractionRoutingModule {
}

