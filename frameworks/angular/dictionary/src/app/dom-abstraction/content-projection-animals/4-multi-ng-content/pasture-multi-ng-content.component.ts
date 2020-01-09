import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasture-multi-ng-content',
  template: `
    <div class="bg-green-light">
      <!-- Even though there are multiple ng-contents, only a single element will be disabled -->
      <ng-content></ng-content>
      <ng-content></ng-content>
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .bg-green-light {
      background-color: green;
    }
  `]
})
export class PastureMultiNgContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
