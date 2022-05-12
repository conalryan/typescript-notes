import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './about.component';


const routes: Routes = [{
  path: 'about',
  component: AboutComponent
}];

@NgModule({
  declarations: [AboutComponent],
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  providers: [
    { provide: APP_BASE_HREF, useValue: '' },
    { provide: LocationStrategy, useClass: HashLocationStrategy },
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
