import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { UpgradeModule } from '@angular/upgrade/static';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UpgradeModule
  ],
  providers: [],
  bootstrap: []
})
export class AppModule {
  constructor(private readonly upgrade: UpgradeModule) { }

  ngDoBootstrap(): void {
    this.upgrade.bootstrap(document.documentElement, ['phonecatApp']);
  }
}
