import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FooRoutingModule } from './foo-routing.module';
import { FooComponent } from './foo.component';
import {CoreModule} from '../core/core.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    CoreModule,
    FooRoutingModule
  ],
  declarations: [FooComponent]
})
export class FooModule { }
