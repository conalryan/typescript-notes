import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyNgbComponent} from './ng-bootstrap/my-ngb.component';
import {MyNgbTypeaheadComponent} from './ng-bootstrap/typeahead/my-ngb-typeahead.component';
import {MultiSelectComponent} from './ng-bootstrap/multi-select/multi-select.component';
import {MultiSelectExComponent} from './ng-bootstrap/multi-select/multi-select-ex.component';

const routes: Routes = [
  {
    path: 'ng-bootstrap',
    component: MyNgbComponent
  },
  {
    path: 'typeahead',
    component: MyNgbTypeaheadComponent
  },
  {
    path: 'multi-select',
    component: MultiSelectComponent
  },
  {
    path: 'multi-select-ex',
    component: MultiSelectExComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWidgetLibrariesRoutingModule {
}
