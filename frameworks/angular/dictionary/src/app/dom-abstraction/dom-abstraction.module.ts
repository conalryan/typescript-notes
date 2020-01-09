import { RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { HostElementComponent } from "./host-element/host-element.component";
import { TemplateRefComponent } from "./template-ref/template-ref.component";
import { ElementRefComponent } from "./element-ref/element-ref.component";
import { ViewContainerRefComponent } from "./view-container-ref/view-container-ref.component";
import { ViewRefComponent } from "./view-ref/view-ref.component";
import { DomAbstractionRoutingModule } from "./dom-abstraction-routing.module";
import { CommonModule } from "@angular/common";
import { ExEntryComponent } from "./view-container-ref/entry-component/ex-entry.component";
import { ContentProjectionComponent } from "./content-projection/container/content-projection.component";
import { ChildComponent } from "./content-projection/components/child.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ViewChildComponent } from "./view-child/view-child.component";
import { ViewChildrenComponent } from "./view-children/container/view-children.component";
import { ContentChildrenComponent } from "./content-children/container/content-children.component";
import { ContentChildComponent } from "./content-children/components/content-child.component";
import { ChildWrapperComponent } from "./content-projection/components/child-wrapper.component";
import { SheepComponent } from './content-projection-animals/sheep.component';
import { ContentProjectionAnimalsNgContentComponent } from './content-projection-animals/1-ng-content/content-projection-animals-ng-content.component';
import { PastureComponent } from './content-projection-animals/1-ng-content/pasture.component';
import { ContentProjectionAnimalsNgContentSelectComponent } from './content-projection-animals/2-ng-content-select/content-projection-animals-ng-content-select.component';
import { PastureTargetComponent } from './content-projection-animals/2-ng-content-select/pasture-target.component';
import { ContentProjectionAnimalsNgContainerProjectAsComponent } from './content-projection-animals/3-ng-container-project-as/content-projection-animals-ng-contianer-project-as.component';
import { PastureProjectAsComponent } from './content-projection-animals/3-ng-container-project-as/pasture-project-as.component';
import { ContentProjectionAnimalsMultiNgContentComponent } from './content-projection-animals/4-multi-ng-content/content-projection-animals-multi-ng-content.component';
import { PastureMultiNgContentComponent } from './content-projection-animals/4-multi-ng-content/pasture-multi-ng-content.component';
import { ContentProjectionAnimalsNgIfOnNgContentComponent } from './content-projection-animals/5-ng-for-ng-if-ng-content/content-projection-animals-ng-if-on-ng-content.component';
import { PastureNgIfOnNgContentComponent } from "./content-projection-animals/5-ng-for-ng-if-ng-content/pasture-ngif-on-ng-content.component";
import { ContentProjectionAnimalsNgTemplateComponent } from "./content-projection-animals/6-ng-template/content-projection-animals-ng-template.component";
import { SheepBlueprintDirective } from './content-projection-animals/6-ng-template/sheep-blueprint.directive';
import { PastureNgTemplateComponent } from "./content-projection-animals/6-ng-template/pasture-ng-template.component";
import { CalendarGridModule } from "./calendar-grid/calendar-grid.module";

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    DomAbstractionRoutingModule,
    CalendarGridModule
  ],
  declarations: [
    HostElementComponent,
    ElementRefComponent,
    TemplateRefComponent,
    ViewContainerRefComponent,
    ViewRefComponent,
    ExEntryComponent,
    ContentProjectionComponent,
    ChildComponent,
    ChildWrapperComponent,
    ViewChildComponent,
    ViewChildrenComponent,
    ChildComponent,
    ContentChildrenComponent,
    ContentChildComponent,
    SheepComponent,
    ContentProjectionAnimalsNgContentComponent,
    PastureComponent,
    ContentProjectionAnimalsNgContentSelectComponent,
    PastureTargetComponent,
    ContentProjectionAnimalsNgContainerProjectAsComponent,
    PastureProjectAsComponent,
    ContentProjectionAnimalsMultiNgContentComponent,
    PastureMultiNgContentComponent,
    ContentProjectionAnimalsNgIfOnNgContentComponent,
    PastureNgIfOnNgContentComponent,
    ContentProjectionAnimalsNgTemplateComponent,
    SheepBlueprintDirective,
    PastureNgTemplateComponent
  ],
  providers: [],
  entryComponents: [ExEntryComponent]
})
export class DomAbstractionModule {}
