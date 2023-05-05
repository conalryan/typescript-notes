import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CalendarCellComponent } from './calendar-cell.component';
import { CalendarGridComponent } from './calendar-grid.component';
import { CalendarGridCellComponent } from './calendar-row/calendar-grid-cell.component';
import { CalendarGridLabelComponent } from './calendar-row/calendar-grid-label.component';
import { CalendarGridRowComponent } from './calendar-row/calendar-grid-row.component';
import { ExCalendarGridRow } from './calendar-row/ex-calendar-grid-row';
import { CalendarGridTemplateComponent } from './ng-template/calendar-grid.component-template';
import { CalendarGridWrapperTemplateComponent } from './ng-template/calendar-grid.component-template-wrapper';

@NgModule({
  declarations: [
    CalendarGridComponent,
    CalendarCellComponent,
    CalendarGridWrapperTemplateComponent,
    CalendarGridTemplateComponent,
    CalendarGridRowComponent,
    ExCalendarGridRow,
    CalendarCellComponent,
    CalendarGridLabelComponent,
    CalendarGridCellComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CalendarGridModule { }
