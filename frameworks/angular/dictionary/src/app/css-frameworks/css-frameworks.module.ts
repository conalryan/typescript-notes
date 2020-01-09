import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CssFrameworksRoutingModule } from "./css-frameworks-routing.module";
import { BootstrapComponent } from "./bootstrap/bootstrap.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { DirectivesModule } from "../directives/directives.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CssFrameworksRoutingModule,
    DirectivesModule
  ],
  declarations: [BootstrapComponent]
})
export class CssFrameworksModule {}
