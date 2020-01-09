import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-calendar-grid-label',
  template: `
    <ng-content></ng-content>
  `,
  styles: [`
    :host {
      border: 1px solid red;
    }
  `]
})
export class CalendarGridLabelComponent {

  @HostBinding('class.col-2') apply: boolean = true;

  constructor() { }
}
