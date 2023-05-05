import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";

import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { DomAbstractionModule } from "../../../../../../packages/frameworks/angular/notes/src/app/dom-abstraction/dom-abstraction.module";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { CssFrameworksModule } from "./css-frameworks/css-frameworks.module";
import { MyFormsModule } from "./forms/my-forms.module";
import { HttpExModule } from "./http-ex/http-ex.module";
import { MyLifecycleHooksModule } from "./lifecycle-hooks/my-lifecycle-hooks.module";
import { ScratchModule } from "./scratch/scratch.module";
import { MyWidgetLibrariesModule } from "./widget-libraries/my-widget-libraries.module";

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
    // me
    CssFrameworksModule,
    MyFormsModule,
    MyLifecycleHooksModule,
    MyWidgetLibrariesModule,
    ScratchModule,
    HttpExModule,
    // app route
    AppRoutingModule
  ],
  declarations: [AppComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
