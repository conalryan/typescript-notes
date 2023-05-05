import { Component, OnInit, OnChanges, Input } from '@angular/core';
import { CalendarGridData } from './calendar-grid-data';
import { calendarGridData } from './calendar-grid-data.stub';

@Component({
  selector: 'app-calendar-grid',
  template: `
    <h2>Calendar Grid</h2>
    <div *ngFor="let propName of propNames" class="row calendar-grid-row">
      <div class="col-2">{{ propName }}</div>

      <div class="col d-flex pl-0">

        <!-- <div *ngFor="let calendarCell of calendarGridData[propName]"
          class="flex-grow-1 calendar-grid-cell">
          {{ calendarCell.value }}
        </div> -->

      </div>
    </div>
  `,
  styles: [`
    .calendar-grid-row:not(:last-child) {
      border-bottom: 1px solid #d2d2d2;
    }

    .calendar-grid-cell {
      text-align: center;
      flex-basis: 0;
    }

    .weekend {
      background-color: #e8e8e8;
    }
  `]
})
export class CalendarGridComponent implements OnInit {

  @Input() calendarGridData: CalendarGridData = calendarGridData();

  // data
  propNames: string[] = [];

  constructor() { }

  // This should really be ngOnChanges, using ngOnInit since the component is router target.
  ngOnInit() {
    console.log('ngOnChanges');
    if (this.calendarGridData) {
      this.propNames = Object.getOwnPropertyNames(this.calendarGridData);
    }
  }
}
