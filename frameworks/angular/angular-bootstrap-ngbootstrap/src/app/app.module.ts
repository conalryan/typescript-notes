import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {AppComponent} from './app.component';
import {MyBootstrapComponent} from './my-bootstrap/my-bootstrap.component';
import {MyNgbComponent} from './my-ngb/my-ngb.component';
import {MyReactiveFormComponent} from './my-reactive-form/my-reactive-form.component';
import {AppRoutingModule} from './app-routing.module';
import {RouterModule} from '@angular/router';
import {MyChangeDetectionComponent} from './change-detection/my-change-detection.component';
import {MyNestedComponent} from './my-nested/my-nested.component';
import {DomAbstractionModule} from './dom-abstraction/dom-abstraction.module';
import {MyChildAComponent} from './change-detection/my-child-a/my-child-a.component';
import {MyChildBComponent} from './change-detection/my-child-b/my-child-b.component';
import {MyChildCComponent} from './change-detection/my-child-c/my-child-c.component';
import {MyTemplateFormComponent} from './my-template-form/my-template-form.component';

/**
 * If a component, directive, or pipe belongs to a module in the imports array, ​don't​ re-declare it in the
 * declarations array. If you wrote it and it should belong to this module, ​do​ declare it in the declarations array.
 */
@NgModule({
  imports: [
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule.forRoot(),
    DomAbstractionModule
  ],
  declarations: [
    AppComponent,
    MyBootstrapComponent,
    MyChangeDetectionComponent,
    MyChildAComponent,
    MyChildBComponent,
    MyChildCComponent,
    MyNestedComponent,
    MyNgbComponent,
    MyReactiveFormComponent,
    MyTemplateFormComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
