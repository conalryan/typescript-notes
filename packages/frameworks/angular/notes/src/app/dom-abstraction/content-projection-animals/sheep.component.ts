import { Component } from '@angular/core';

let instances = 0;

@Component({
  selector: 'app-sheep',
  template: `
    <h1>{{count}} 🐑</h1>
  `,
  styles: [`
    // Style is not working. It appears in the dom _nghost but has not affect
    // :host {
    //   h1 {
    //     color: red;
    //   }
    // }
  `]
})
export class SheepComponent {
  count: number;

  constructor() {
    this.count = ++instances;
  }
}
