import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ARoutingModule } from './a-routing.module';
import { ParentComponent } from './container/parent.component';
import { ChildAComponent } from './component/child-a.component';
import { ChildBComponent } from './component/child-b.component';

@NgModule({
  imports: [
    CommonModule,
    ARoutingModule
  ],
  declarations: [ParentComponent, ChildAComponent, ChildBComponent]
})
export class AModule { }
