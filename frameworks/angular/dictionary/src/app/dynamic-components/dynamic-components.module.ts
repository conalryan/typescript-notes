import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {DynamicComponentsRoutingModule} from './dynamic-components-routing.module';
import {OnTheFlyComponent} from './on-the-fly/on-the-fly.component';
import { FactoryResolverComponent } from './factory-resolver/factory-resolver.component';
import { ChildComponent } from './factory-resolver/child.component';

@NgModule({
  imports: [
    CommonModule,
    DynamicComponentsRoutingModule
  ],
  declarations: [OnTheFlyComponent, FactoryResolverComponent, ChildComponent],
  //entryComponents: [ChildComponent]
})
export class DynamicComponentsModule { }
