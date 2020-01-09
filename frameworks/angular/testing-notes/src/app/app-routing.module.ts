import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {FormComponent} from "./form/form.component";
import {NgbComponent} from "./ngb/ngb.component";

const routes: Routes = [
  {path: 'form', component: FormComponent},
  {path: 'ngbform', component: NgbComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,
    {
      enableTracing: true, // <-- debugging purposes onl
      // to avoid 404 on refresh, once dev complete we need
      // configure server to route index.html or something
      // when something dindn't found
      useHash: true
    })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
