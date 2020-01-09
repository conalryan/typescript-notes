import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { MyLifecycleHooksRoutingModule } from "./my-lifecycle-hooks-routing.module";
import { MyLifecycleHooksComponent } from "./my-lifecycle-hooks.component";
import { MySimpleChangesComponent } from "./simple-changes/my-simple-changes.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "../directives/directives.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DirectivesModule,
    MyLifecycleHooksRoutingModule
  ],
  declarations: [MyLifecycleHooksComponent, MySimpleChangesComponent]
})
export class MyLifecycleHooksModule {}
