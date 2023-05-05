import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-projection-animals-ng-template',
  template: `
    <h2>ng-template</h2>
    <app-pasture-ng-template>
      <app-sheep *appSheepBlueprint></app-sheep>
    </app-pasture-ng-template>
  `,
  styles: []
})
export class ContentProjectionAnimalsNgTemplateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
