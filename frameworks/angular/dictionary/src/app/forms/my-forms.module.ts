import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyFormsRoutingModule } from "./my-forms-routing.module";
import { MyListComponent } from "./reactive-forms/parent-list-detail/list/my-list.component";
import { MyCompoundFormComponent } from "./reactive-forms/compound-form/my-compound-form.component";
import { MySimpleFormComponent } from "./reactive-forms/simple-form/my-simple-form.component";
import { MyFormArrayComponent } from "./reactive-forms/form-array/my-form-array.component";
import { MyDetailComponent } from "./reactive-forms/parent-list-detail/detail/my-detail.component";
import { MyParentComponent } from "./reactive-forms/parent-list-detail/parent/my-parent.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyTemplateFormComponent } from "./template-forms/my-template-form.component";
import { DirectivesModule } from "../directives/directives.module";
import { TemplateCounterComponent } from "./reactive-v-template/temp-attempt-1/counter/template-counter.component";
import { TemplateSolutionCounterComponent } from "./reactive-v-template/temp-attempt-2/counter/template-solution-counter.component";
import { TemplateSolutionFormComponent } from "./reactive-v-template/temp-attempt-2/template-solution-form.component";
import { TemplateSolutionMultiFormComponent } from "./reactive-v-template/temp-attempt-3/template-solution-multi-form.component";
import { ReactiveFormComponent } from "./reactive-v-template/reac-solution/reactive-form.component";
import { ReactiveCounterComponent } from "./reactive-v-template/reac-solution/counter/reactive-counter.component";
import { TemplateFormComponent } from "./reactive-v-template/temp-attempt-1/template-form.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyFormsRoutingModule,
    DirectivesModule
  ],
  declarations: [
    MyTemplateFormComponent,
    MySimpleFormComponent,
    MyCompoundFormComponent,
    MyFormArrayComponent,
    MyParentComponent,
    MyListComponent,
    MyDetailComponent,
    TemplateFormComponent,
    TemplateCounterComponent,
    TemplateSolutionCounterComponent,
    TemplateSolutionFormComponent,
    TemplateSolutionMultiFormComponent,
    ReactiveFormComponent,
    ReactiveCounterComponent
  ]
})
export class MyFormsModule {}
