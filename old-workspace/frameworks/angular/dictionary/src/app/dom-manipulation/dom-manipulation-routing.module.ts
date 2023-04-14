import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomManipulationContainer } from "./container/dom-manipulation.container";
import { RouterModule } from "@angular/router";

const ROUTES = [
  {
    path: "dom-manipulation",
    component: DomManipulationContainer
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(ROUTES)],
  declarations: []
})
export class DomManipulationRoutingModule {}
