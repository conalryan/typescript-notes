import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ChangeDetectionRoutingModule } from "./change-detection-routing.module";
import { ChangeDetectionContainer } from "./container/change-detection.container";
import { ChildAComponent } from "./components/child-a.component";
import { ChildBComponent } from "./components/child-b.component";
import { ChildCComponent } from "./components/child-c.component";

@NgModule({
  imports: [CommonModule, ChangeDetectionRoutingModule],
  declarations: [
    ChangeDetectionContainer,
    ChildAComponent,
    ChildBComponent,
    ChildCComponent
  ]
})
export class ChangeDetectionModule {}
