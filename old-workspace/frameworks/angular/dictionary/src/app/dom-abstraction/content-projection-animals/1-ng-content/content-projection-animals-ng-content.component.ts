import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-projection-animals-ng-content',
  template: `
    <h2>ng-content</h2>
    <div class="border bg-white">
      <app-pasture>
        <app-sheep></app-sheep>
        <app-sheep></app-sheep>
        <h1>I'm not a sheep</h1>
      </app-pasture>
    </div>
  `,
  styles: [`
    .bg-white {
      background-color: white;
    }
  `]
})
export class ContentProjectionAnimalsNgContentComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
