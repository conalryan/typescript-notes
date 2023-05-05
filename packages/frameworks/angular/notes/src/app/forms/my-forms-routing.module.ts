import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MyTemplateFormComponent} from './template-forms/my-template-form.component';
import {MyCompoundFormComponent} from './reactive-forms/compound-form/my-compound-form.component';
import {MySimpleFormComponent} from './reactive-forms/simple-form/my-simple-form.component';
import {MyFormArrayComponent} from './reactive-forms/form-array/my-form-array.component';
import {MyParentComponent} from './reactive-forms/parent-list-detail/parent/my-parent.component';
import {TemplateFormComponent} from './reactive-v-template/temp-attempt-1/template-form.component';
import {TemplateSolutionFormComponent} from './reactive-v-template/temp-attempt-2/template-solution-form.component';
import {TemplateSolutionMultiFormComponent} from './reactive-v-template/temp-attempt-3/template-solution-multi-form.component';
import {ReactiveFormComponent} from './reactive-v-template/reac-solution/reactive-form.component';

const routes: Routes = [
  {
    path: 'reactive-form',
    component: MySimpleFormComponent
  },
  {
    path: 'simple-form',
    component: MySimpleFormComponent
  },
  {
    path: 'compound-form',
    component: MyCompoundFormComponent
  },
  {
    path: 'form-array',
    component: MyFormArrayComponent
  },
  {
    path: 'parent-list-detail',
    component: MyParentComponent
  },
  {
    path: 'template-form',
    component: MyTemplateFormComponent
  },
  {
    path: 'forms',
    children: [
      {
        path: 'template',
        component: TemplateFormComponent
      },
      {
        path: 'template-solution',
        component: TemplateSolutionFormComponent
      },
      {
        path: 'template-solution-multi',
        component: TemplateSolutionMultiFormComponent
      },
      {
        path: 'reactive',
        component: ReactiveFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFormsRoutingModule {
}
