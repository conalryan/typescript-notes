import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { FixedHeightComponent } from "./fixed-height/fixed-height.component";
import { FixedHeightMasterComponent } from "./fixed-height-master-list-detail/fixed-height-master.component";
import { TableTabindexComponent } from "./table-navigation/table-tabindex/table-tabindex.component";
import { TableTabindexHiddenComponent } from "./table-navigation/table-tabindex-hidden/table-tabindex-hidden.component";
import { TableArrowKeysComponent } from "./table-navigation/table-arrow-keys/table-arrow-keys.component";
import { TableWidthComponent } from "./table-width/table-width.component";

const routes: Routes = [
  {
    path: "fixed-height",
    component: FixedHeightComponent
  },
  {
    path: "fixed-height-master",
    component: FixedHeightMasterComponent
  },
  {
    path: "table-arrow-keys",
    component: TableArrowKeysComponent
  },
  {
    path: "table-tabindex",
    component: TableTabindexComponent
  },
  {
    path: "table-tabindex-hidden",
    component: TableTabindexHiddenComponent
  },
  {
    path: "table-width",
    component: TableWidthComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CssHacksRoutingModule {}
