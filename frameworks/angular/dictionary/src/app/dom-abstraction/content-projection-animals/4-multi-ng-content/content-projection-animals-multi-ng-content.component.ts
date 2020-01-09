import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-projection-animals-multi-ng-content',
  template: `
    <h2>multi ng-content</h2>
    <div class="border bg-white">
      <app-pasture-multi-ng-content>
        <app-sheep></app-sheep>
      </app-pasture-multi-ng-content>

      <app-pasture-multi-ng-content>
        <!-- Removing <ng-contents has no affect. Everyting will appear in the first ng-content -->
        <app-sheep></app-sheep>
        <app-sheep></app-sheep>
        <app-sheep></app-sheep>
        <app-sheep></app-sheep>
        <h1>I'm not a sheep</h1>
        <h1>I'm not a sheep</h1>
        <h1>I'm not a sheep</h1>
        <h1>I'm not a sheep</h1>
      </app-pasture-multi-ng-content>
    </div>
  `,
  styles: [`
    .bg-white {
      background-color: white;
    }
  `]
})
export class ContentProjectionAnimalsMultiNgContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
