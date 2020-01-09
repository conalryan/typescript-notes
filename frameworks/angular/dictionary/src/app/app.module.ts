import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { RouterModule } from "@angular/router";
import { MyFormsModule } from "./forms/my-forms.module";
import { ChangeDetectionModule } from "./change-detection/change-detection.module";
import { CssFrameworksModule } from "./css-frameworks/css-frameworks.module";
import { CssHacksModule } from "./css-hacks/css-hacks.module";
import { DirectivesModule } from "./directives/directives.module";
import { DomAbstractionModule } from "./dom-abstraction/dom-abstraction.module";
import { MyWidgetLibrariesModule } from "./widget-libraries/my-widget-libraries.module";
import { MyLifecycleHooksModule } from "./lifecycle-hooks/my-lifecycle-hooks.module";
import { ScratchModule } from "./scratch/scratch.module";
import { ExpressionChangedAfterCheckModule } from "./expression-changed-after-check/expression-changed-after-check.module";
import { HttpExModule } from "./http-ex/http-ex.module";
import { HttpClientModule } from "@angular/common/http";
import { DynamicComponentsModule } from "./dynamic-components/dynamic-components.module";
import { DomManipulationModule } from "./dom-manipulation/dom-manipulation.module";

/**
 * If a component, directive, or pipe belongs to a module in the imports array, ​don't​ re-declare it in the
 * declarations array. If you wrote it and it should belong to this module, ​do​ declare it in the declarations array.
 */
@NgModule({
  imports: [
    // Angular
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    // import HttpClientModule after BrowserModule.
    HttpClientModule,
    // Third-party
    NgbModule.forRoot(),
    // me
    ChangeDetectionModule,
    CssFrameworksModule,
    CssHacksModule,
    DirectivesModule,
    DomAbstractionModule,
    DomManipulationModule,
    MyFormsModule,
    MyLifecycleHooksModule,
    MyWidgetLibrariesModule,
    ScratchModule,
    ExpressionChangedAfterCheckModule,
    HttpExModule,
    DynamicComponentsModule,
    // app route
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
