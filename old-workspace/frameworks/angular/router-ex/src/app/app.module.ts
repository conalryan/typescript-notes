import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AModule} from './a-module/a.module';
import {ImportsLazyModule} from './imports-lazy/imports-lazy.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AModule,
    // ImportsLazyModule, Importing a lazy loaded module in a non-lazy module causes error
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
