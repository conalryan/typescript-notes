import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasture-ng-for-ng-if-ng-content',
  template: `
    <div class="bg-green-light">
      <p>ng for</p>
      <ng-content *ngFor="let clone of clones"></ng-content>
    </div>

    <hr/>

    <div class="bg-green-light">
      <p>ng if</p>
      <!--
      YOu can hide/show the element but you cannot control the lifecycle.
      In other words, it will be the same component instance that shows/hides.
      -->
      <ng-content *ngIf="!hiding"></ng-content>
    </div>
    <button type="button" (click)="hiding = !hiding">Toggle visibility</button>
  `,
  styles: [`
    .bg-green-light {
      background-color: green;
    }
  `]
})
export class PastureNgIfOnNgContentComponent implements OnInit {

  clones = [1, 2, 3];

  hiding = false;
  constructor() { }

  ngOnInit() {
  }

}
