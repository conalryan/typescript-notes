import { Component } from '@angular/core';

let instances = 0;

@Component({
  selector: 'app-sheep',
  template: `
    <h1>{{count}} 🐑</h1>
  `,
  styles: [`

  `]
})
export class SheepComponent {
  count: number;

  constructor() {
    this.count = ++instances;
  }
}
