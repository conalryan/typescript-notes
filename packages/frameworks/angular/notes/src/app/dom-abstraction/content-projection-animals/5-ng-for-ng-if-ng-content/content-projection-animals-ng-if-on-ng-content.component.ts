import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-projection-animals-ng-if-on-ng-content',
  template: `
    <h2>ng-for and ng-if ng-content</h2>
    <div class="border bg-white">
      <app-pasture-ng-for-ng-if-ng-content>
        <app-sheep></app-sheep>
      </app-pasture-ng-for-ng-if-ng-content>
    </div>
  `,
  styles: [`
    .bg-white {
      background-color: white;
    }
  `]
})
export class ContentProjectionAnimalsNgIfOnNgContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
