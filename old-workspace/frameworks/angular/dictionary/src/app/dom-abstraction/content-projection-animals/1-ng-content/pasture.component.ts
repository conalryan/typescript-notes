import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pasture',
  template: `
    <div class="bg-green-light">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .bg-green-light {
      background-color: green;
    }
  `]
})
export class PastureComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
