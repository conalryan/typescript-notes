import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardHoverComponent } from './card-hover/card-hover.component';
import { ClassDirectiveComponent } from './class-directive/class-directive.component';
import { ElementDirectiveWrapperComponent } from './element-directive/element-directive-wrapper.component';
import { HostBindingComponent } from './host-binding/host-binding.component';
import { HostListenerComponent } from './host-listener/host-listener.component';
import { IfComponent } from './if/if.component';

const routes: Routes = [
  {
    path: 'element-directive',
    component: ElementDirectiveWrapperComponent
  },
  {
    path: 'class-directive',
    component: ClassDirectiveComponent
  },
  {
    path: 'card-hover',
    component: CardHoverComponent
  },
  {
    path: 'host-binding',
    component: HostBindingComponent
  },
  {
    path: 'host-listener',
    component: HostListenerComponent
  },
  {
    path: 'if',
    component: IfComponent
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DirectivesRoutingModule {}
