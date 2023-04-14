import { Component } from '@angular/core';
import { CalendarGridData } from '../calendar-grid-data';
import { calendarGridData } from '../calendar-grid-data.stub';

@Component({
  selector: 'app-calendar-grid-template-wrapper',
  template: `
    <h2>Calendar Grid Wrapper</h2>

    <app-calendar-grid-template
      [calendarGridData]="calendarGridData"
      [titleTemplate]="titleTemplate"
      [dataTemplate]="dataTemplate">
      <ng-template #titleTemplate let-l="label">
        {{ l }}
      </ng-template>
      <ng-template #dataTemplate let-c="cell">
        {{ c.value }}
      </ng-template>
    </app-calendar-grid-template>
  `,
  styles: [`

  `]
})
export class CalendarGridWrapperTemplateComponent {

  calendarGridData: CalendarGridData = calendarGridData();

  constructor() { }
}
