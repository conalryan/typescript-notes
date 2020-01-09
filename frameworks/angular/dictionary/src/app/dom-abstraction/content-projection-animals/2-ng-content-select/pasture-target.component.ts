import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasture-target',
  template: `
    <div class="bg-green-light">
      <!-- <app-sheep> will appear here -->
      <ng-content select="app-sheep"></ng-content>
    </div>
    <!-- anything that's not <app-sheep> will appear here -->
    <ng-content></ng-content>
  `,
  styles: [`
    .bg-green-light {
      background-color: green;
    }
  `]
})
export class PastureTargetComponent  {}

