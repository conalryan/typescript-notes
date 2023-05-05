import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-calendar-grid-cell',
  template: `
    <div class="flex-grow-1 calendar-grid-cell">
      <ng-content></ng-content>
    </div>
  `,
  styles: [`
    .calendar-grid-cell {
      border: 1px solid blue;
      text-align: center;
      flex-basis: 0;
    }
  `]
})
export class CalendarGridCellComponent {

  @HostBinding('class.col') col: boolean = true;
  @HostBinding('class.d-flex') dFlex: boolean = true;
  @HostBinding('class.p-0') pl: boolean = true;

  constructor() { }
}
