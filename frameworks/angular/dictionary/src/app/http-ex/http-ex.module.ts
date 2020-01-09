import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpExComponent } from './http-ex.component';
import {HttpExRoutingModule} from './http-ex-routing.module';

@NgModule({
  imports: [
    CommonModule,
    HttpExRoutingModule
  ],
  declarations: [HttpExComponent]
})
export class HttpExModule { }
