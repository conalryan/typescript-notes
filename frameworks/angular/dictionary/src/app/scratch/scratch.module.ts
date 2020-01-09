import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ScratchRoutingModule } from "./scratch-routing.module";
import { ParentComponent } from "./parent.component";
import { ChildAComponent } from "./child-a/child-a.component";
import { ChildBComponent } from "./child-b/child-b.component";
import { AService } from "./service/a.service";
import { SpyDirective } from "../directives/spy-directive/spy.directive";
import { DirectivesModule } from "../directives/directives.module";
import { SingleObjectComponent } from "./single-object/single-object.component";

@NgModule({
  imports: [CommonModule, DirectivesModule, ScratchRoutingModule],
  declarations: [
    ParentComponent,
    ChildAComponent,
    ChildBComponent,
    SingleObjectComponent
  ],
  providers: [AService]
})
export class ScratchModule {}
