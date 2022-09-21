import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { UpgradeModule } from '@angular/upgrade/static';

import { RemoteEntryComponent } from './entry.component';

@NgModule({
  declarations: [RemoteEntryComponent],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: RemoteEntryComponent,
      },
    ]),
  ],
  providers: [],
})
export class RemoteEntryModule {
  constructor(private readonly upgrade: UpgradeModule) { }

  ngDoBootstrap(): void {
    this.upgrade.bootstrap(document.documentElement, ['phonecatApp']);
  }
}
