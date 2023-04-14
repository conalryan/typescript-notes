import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ImportsLazyRoutingModule } from './imports-lazy-routing.module';
import { ImportsLazyComponent } from './imports-lazy.component';
import {LazyModule} from '../lazy/lazy.module';

/**
 * If another module imports a lazy module, you get a criptic error:
 * core.js:1673 ERROR Error: Uncaught (in promise): TypeError: undefined is not a function
 * TypeError: undefined is not a function
 * at Array.map (<anonymous>)
 * at webpackAsyncContext ($_lazy_route_resource lazy namespace object:15)
 * at SystemJsNgModuleLoader.push../node_modules/@angular/core/fesm5/core.js.SystemJsNgModuleLoader.loadAndCompile (core.js:4982)
 */
@NgModule({
  imports: [
    CommonModule,
    LazyModule,
    ImportsLazyRoutingModule
  ],
  declarations: [ImportsLazyComponent]
})
export class ImportsLazyModule { }
