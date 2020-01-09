import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { OnTheFlyComponent } from "./on-the-fly/on-the-fly.component";
import { FactoryResolverComponent } from "./factory-resolver/factory-resolver.component";

const routes: Routes = [
  {
    path: "factory-resolver",
    component: FactoryResolverComponent
  },
  {
    path: "on-the-fly",
    component: OnTheFlyComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DynamicComponentsRoutingModule {}
