import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DomManipulationContainer } from "./container/dom-manipulation.container";
import { DomManipulationRoutingModule } from "./dom-manipulation-routing.module";
import { AComponent } from "./components/a.component";
import { BComponent } from "./components/b.component";

@NgModule({
  imports: [CommonModule, DomManipulationRoutingModule],
  declarations: [DomManipulationContainer, AComponent, BComponent]
})
export class DomManipulationModule {}
