import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { ExpressionChangedAfterCheckRoutingModule } from "./expression-changed-after-check-routing.module";
import { ExpressionChangedAfterCheckComponent } from "./container/expression-changed-after-check.component";
import { ChildComponent } from "./components/child.component";
import { SharedService } from "./service/shared.service";

@NgModule({
  imports: [CommonModule, ExpressionChangedAfterCheckRoutingModule],
  declarations: [ExpressionChangedAfterCheckComponent, ChildComponent],
  providers: [SharedService]
})
export class ExpressionChangedAfterCheckModule {}
