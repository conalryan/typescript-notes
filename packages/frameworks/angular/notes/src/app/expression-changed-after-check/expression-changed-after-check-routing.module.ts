import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { ExpressionChangedAfterCheckComponent } from "./container/expression-changed-after-check.component";

const routes: Routes = [
  {
    path: "",
    component: ExpressionChangedAfterCheckComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExpressionChangedAfterCheckRoutingModule {}
