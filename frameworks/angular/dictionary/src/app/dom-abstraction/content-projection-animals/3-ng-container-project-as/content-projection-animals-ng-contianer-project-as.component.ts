import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-projection-animals-ng-container-project-as',
  template: `
    <h2>ng-container ngProjectAs</h2>
    <div class="border bg-white">
      <app-pasture-project-as>
        <ng-container>
          <app-sheep></app-sheep>
        </ng-container>
        <app-sheep></app-sheep>
        <h1>I'm not a sheep</h1>
      </app-pasture-project-as>

      <!--
      Actual display will be

      <app-pasture-project-as>
        <app-sheep>2 Sheep</sheep>
      </app-pasture-project-as>

      <h1>I'm not a sheep</h1>
      <app-sheep>1 Sheep</app-sheep>
      -->

      <app-pasture-project-as>
        <ng-container ngProjectAs="app-sheep">
          <app-sheep></app-sheep>
        </ng-container>
        <app-sheep></app-sheep>
        <h1>I'm not a sheep</h1>
      </app-pasture-project-as>

      <!--
      Now display matches html

      <app-pasture-project-as>
        <app-sheep>3 Sheep</sheep>
        <app-sheep>4 Sheep</app-sheep>
      </app-pasture-project-as>
      <h1>I'm not a sheep</h1>
      -->
    </div>
  `,
  styles: [`
    .bg-white {
      background-color: white;
    }
  `]
})
export class ContentProjectionAnimalsNgContainerProjectAsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
