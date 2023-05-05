import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-pasture-ng-template',
  template: `
    <div class="bg-green-light">
      <ng-container [ngTemplateOutlet]="sheepTemplate"></ng-container>
    </div>
    <div class="bg-green-light">
      <ng-content *ngFor="let sheep of flock; template: sheepTemplate"></ng-content>
    </div>
  `,
  styles: [`
    .bg-green-light {
      background-color: green;
    }
  `]
})
export class PastureNgTemplateComponent implements OnInit {

  flock = [1, 2, 3];

  public sheepTemplate: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

}
