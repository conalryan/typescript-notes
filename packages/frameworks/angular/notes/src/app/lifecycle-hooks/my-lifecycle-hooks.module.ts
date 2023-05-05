import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MyLifecycleHooksRoutingModule } from "./my-lifecycle-hooks-routing.module";
import { MyLifecycleHooksComponent } from "./my-lifecycle-hooks.component";
import { MySimpleChangesComponent } from "./simple-changes/my-simple-changes.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MyLifecycleHooksRoutingModule
  ],
  declarations: [MyLifecycleHooksComponent, MySimpleChangesComponent]
})
export class MyLifecycleHooksModule {}
