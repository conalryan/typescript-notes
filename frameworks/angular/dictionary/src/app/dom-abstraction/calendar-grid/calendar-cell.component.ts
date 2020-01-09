import { Component, OnInit, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-calendar-cell',
  template: `
    <div class="col d-flex pl-0">
      <ng-content class="flex-grow-1 calendar-grid-cell" *ngFor="let cell of cells; template: cellTemplate"></ng-content>
      <ng-container [ngTemplateOutlet]="sheepTemplate"></ng-container>
    </div>
  `,
  styles: [`

    .calendar-grid-cell {
      text-align: center;
      // https://stackoverflow.com/questions/25066214/flexbox-not-giving-equal-width-to-elements/25066844#25066844
      flex-basis: 0;
    }

  `]
})
export class CalendarCellComponent implements OnInit {

  cells = [1, 2, 3];

  public cellTemplate: TemplateRef<void>;

  constructor() { }

  ngOnInit() {
  }

}
