import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWidgetLibrariesRoutingModule } from './my-widget-libraries-routing.module';
import {MyNgbComponent} from './ng-bootstrap/my-ngb.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { TaggedInputComponent } from './ng-bootstrap/tagged-input/tagged-input.component';
import { MyNgbTypeaheadComponent } from './ng-bootstrap/typeahead/my-ngb-typeahead.component';
import { MultiSelectComponent } from './ng-bootstrap/multi-select/multi-select.component';
import { MultiSelectDirective } from './ng-bootstrap/multi-select/multi-select.directive';
import { MultiSelectExComponent } from './ng-bootstrap/multi-select/multi-select-ex.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    ReactiveFormsModule,
    MyWidgetLibrariesRoutingModule
  ],
  declarations: [
    MyNgbComponent,
    TaggedInputComponent,
    MyNgbTypeaheadComponent,
    MultiSelectComponent,
    MultiSelectDirective,
    MultiSelectExComponent
  ]
})
export class MyWidgetLibrariesModule { }
