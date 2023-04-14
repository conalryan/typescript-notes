import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";
import { HostElementComponent } from "./host-element/host-element.component";
import { TemplateRefComponent } from "./template-ref/template-ref.component";
import { ElementRefComponent } from "./element-ref/element-ref.component";
import { ViewContainerRefComponent } from "./view-container-ref/view-container-ref.component";
import { ViewRefComponent } from "./view-ref/view-ref.component";
import { ContentProjectionComponent } from "./content-projection/container/content-projection.component";
import { ViewChildComponent } from "./view-child/view-child.component";
import { ViewChildrenComponent } from "./view-children/container/view-children.component";
import { ContentChildrenComponent } from "./content-children/container/content-children.component";
import { ContentProjectionAnimalsNgContentComponent } from "./content-projection-animals/1-ng-content/content-projection-animals-ng-content.component";
import { ContentProjectionAnimalsNgContentSelectComponent } from "./content-projection-animals/2-ng-content-select/content-projection-animals-ng-content-select.component";
import { ContentProjectionAnimalsNgContainerProjectAsComponent } from "./content-projection-animals/3-ng-container-project-as/content-projection-animals-ng-contianer-project-as.component";
import { ContentProjectionAnimalsMultiNgContentComponent } from "./content-projection-animals/4-multi-ng-content/content-projection-animals-multi-ng-content.component";
import { ContentProjectionAnimalsNgIfOnNgContentComponent } from "./content-projection-animals/5-ng-for-ng-if-ng-content/content-projection-animals-ng-if-on-ng-content.component";
import { ContentProjectionAnimalsNgTemplateComponent } from "./content-projection-animals/6-ng-template/content-projection-animals-ng-template.component";
import { CalendarGridComponent } from "./calendar-grid/calendar-grid.component";
import { CalendarGridWrapperTemplateComponent } from "./calendar-grid/ng-template/calendar-grid.component-template-wrapper";
import { ExCalendarGridRow } from "./calendar-grid/calendar-row/ex-calendar-grid-row";

const routes: Routes = [
  /* TODO: Make this a parent and child routes {
    path: 'dom-abstraction',
    pathMatch: 'full',
    redirectTo: 'view-child'
  },*/
  {
    path: "content-children",
    component: ContentChildrenComponent
  },
  {
    path: "content-projection",
    component: ContentProjectionComponent
  },
  {
    path: "content-projection-animals-1",
    component: ContentProjectionAnimalsNgContentComponent
  },
  {
    path: "content-projection-animals-2",
    component: ContentProjectionAnimalsNgContentSelectComponent
  },
  {
    path: "content-projection-animals-3",
    component: ContentProjectionAnimalsNgContainerProjectAsComponent
  },
  {
    path: "content-projection-animals-4",
    component: ContentProjectionAnimalsMultiNgContentComponent
  },
  {
    path: "content-projection-animals-5",
    component: ContentProjectionAnimalsNgIfOnNgContentComponent
  },
  {
    path: "content-projection-animals-6",
    component: ContentProjectionAnimalsNgTemplateComponent
  },
  {
    path: "calendar-grid",
    component: CalendarGridWrapperTemplateComponent
  },
  {
    path: "calendar-row",
    component: ExCalendarGridRow
  },
  {
    path: "element-ref",
    component: ElementRefComponent
  },
  {
    path: "host-element",
    component: HostElementComponent
  },
  {
    path: "template-ref",
    component: TemplateRefComponent
  },
  {
    path: "view-child",
    component: ViewChildComponent
  },
  {
    path: "view-children",
    component: ViewChildrenComponent
  },
  {
    path: "view-container-ref",
    component: ViewContainerRefComponent
  },
  {
    path: "view-ref",
    component: ViewRefComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DomAbstractionRoutingModule {}
