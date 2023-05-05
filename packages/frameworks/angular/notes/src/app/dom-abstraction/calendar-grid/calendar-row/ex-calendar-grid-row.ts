import { Component } from '@angular/core';
import { CalendarGridCell, CalendarGridData } from '../calendar-grid-data';
import { calendarGridData, strCells } from '../calendar-grid-data.stub';

@Component({
  selector: 'app-ex-calendar-grid-row',
  template: `
    <h4>Calendar Row</h4>

    {{calendarGridData.rows[0].cells | json}}

    <app-calendar-grid-row [calendarGridRow]="calendarGridData.rows[0]">
      <app-calendar-grid-label>Row 1</app-calendar-grid-label>
      <app-calendar-grid-cell>Hello there</app-calendar-grid-cell>
    </app-calendar-grid-row>

    <app-calendar-grid-cell>Inside app-calendar-grid-cell</app-calendar-grid-cell>

    <div class="row">
      <app-calendar-grid-label>Row 1</app-calendar-grid-label>
      <app-calendar-grid-cell *ngFor="let cell of cells">{{cell.value}}</app-calendar-grid-cell>
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
export class ExCalendarGridRow {

  calendarGridData: CalendarGridData = calendarGridData();

  cells: CalendarGridCell<string>[] = strCells();

  constructor() { }
}
