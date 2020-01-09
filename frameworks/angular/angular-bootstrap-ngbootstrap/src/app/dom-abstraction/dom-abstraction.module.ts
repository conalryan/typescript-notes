import {RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {MyHostElementComponent} from './host-element/my-host-element.component';
import {MyTemplateRefComponent} from './view-child/template-ref/my-template-ref.component';
import {MyElementRefComponent} from './view-child/element-ref/my-element-ref.component';
import {MyViewContainerRefComponent} from './view-child/view-container-ref/my-view-container-ref.component';
import {MyViewRefComponent} from './view-child/view-ref/my-view-ref.component';
import {DomAbstractionRoutingModule} from './dom-abstraction-routing.module';

@NgModule({
  imports: [
    RouterModule,
    DomAbstractionRoutingModule
  ],
  declarations: [
    MyHostElementComponent,
    MyElementRefComponent,
    MyTemplateRefComponent,
    MyViewContainerRefComponent,
    MyViewRefComponent
  ],
  providers: []
})
export class DomAbstractionModule {
}

