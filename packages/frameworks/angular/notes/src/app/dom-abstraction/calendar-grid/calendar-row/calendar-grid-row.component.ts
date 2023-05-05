import { Component, HostBinding, Input } from '@angular/core';
import { CalendarGridCell, CalendarGridRow } from '../calendar-grid-data';

@Component({
  selector: 'app-calendar-grid-row',
  template: `
    <!-- Label -->
    <ng-content select="app-calendar-grid-label"></ng-content>

    <!--<ng-template #cell>
      <ng-content select="app-calendar-grid-cell"></ng-content>
    </ng-template>-->

    <ng-template #hi>
      Hi
      <ng-content select="app-calendar-grid-cell"></ng-content>
    </ng-template>

    <!--<ng-container *ngFor="let calendarCell of calendarGridRow.cells">
      !--<ng-container *ngTemplateOutlet="cell;context:{cellData:calendarCell}"></ng-container>--
      ngFor loop cells
      <ng-container *ngTemplateOutlet="hi"></ng-container>
    </ng-container>-->

    <ng-content *ngFor="let calendarCell of calendarGridRow.cells; template: hi"></ng-content>
  `,
  styles: [`
    :host:not(:last-child) {
      border-bottom: 1px solid #d2d2d2;
    }
    :host {
      border: 1px solid red;
    }
  `]
})
export class CalendarGridRowComponent {

  @HostBinding('class.row') apply: boolean = true;

  @Input() calendarGridRow: CalendarGridRow<any>;

  constructor() { }
}
