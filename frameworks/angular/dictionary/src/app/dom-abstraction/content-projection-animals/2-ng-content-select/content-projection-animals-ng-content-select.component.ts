import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-projection-animals-ng-content-select',
  template: `
    <h2>ng-content select</h2>
    <div class="border bg-white">
      <app-pasture-target>
        <app-sheep></app-sheep>
        <app-sheep></app-sheep>
        <h1>I'm not a sheep</h1>
      </app-pasture-target>
    </div>
  `,
  styles: [`
    .bg-white {
      background-color: white;
    }
  `]
})
export class ContentProjectionAnimalsNgContentSelectComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
