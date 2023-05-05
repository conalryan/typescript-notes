import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ChangeDetectionContainer } from "./container/change-detection.container";

const routes: Routes = [
  {
    path: "",
    component: ChangeDetectionContainer
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeDetectionRoutingModule {}
