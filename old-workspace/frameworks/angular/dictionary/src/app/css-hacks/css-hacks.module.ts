import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { CssHacksRoutingModule } from "./css-hacks-routing.module";
import { FixedHeightComponent } from "./fixed-height/fixed-height.component";
import {
  FixedHeightDetailComponent,
  FixedHeightListComponent,
  FixedHeightMasterComponent
} from "./fixed-height-master-list-detail/fixed-height-master.component";
import { TableTabindexComponent } from "./table-navigation/table-tabindex/table-tabindex.component";
import { TableTabindexHiddenComponent } from "./table-navigation/table-tabindex-hidden/table-tabindex-hidden.component";
import { TableArrowKeysComponent } from "./table-navigation/table-arrow-keys/table-arrow-keys.component";
import { TableWidthComponent } from "./table-width/table-width.component";

@NgModule({
  imports: [CommonModule, CssHacksRoutingModule],
  declarations: [
    FixedHeightComponent,
    FixedHeightMasterComponent,
    FixedHeightListComponent,
    FixedHeightDetailComponent,
    TableTabindexComponent,
    TableTabindexHiddenComponent,
    TableArrowKeysComponent,
    TableWidthComponent
  ]
})
export class CssHacksModule {}
