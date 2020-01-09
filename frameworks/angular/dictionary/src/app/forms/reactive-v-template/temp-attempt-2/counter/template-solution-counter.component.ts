import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';

@Component({
  selector: 'app-template-solution-counter',
  templateUrl: './template-solution-counter.component.html',
  styleUrls: ['./template-solution-counter.component.scss']
})
export class TemplateSolutionCounterComponent implements OnInit {

  @Input() count: number;
  @Input() minValue = 0;
  @Input() maxValue = 10;

  @Input() form: NgForm;
  @ViewChild('countRef') countRef: NgModel;

  constructor() {
  }

  ngOnInit() {
    this.form.addControl(this.countRef);
  }

  isIncrementDisabled(): boolean {
    return this.count >= this.maxValue;
  }

  isDecrementDisabled(): boolean {
    return this.count <= this.minValue;
  }

  countIncrement(): void {
    this.count += 1;
  }

  countDecrement(): void {
    this.count -= 1;
  }
}
