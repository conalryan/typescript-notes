import {Component, Input, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-reactive-counter',
  templateUrl: './reactive-counter.component.html',
  styleUrls: ['./reactive-counter.component.scss']
})
export class ReactiveCounterComponent {

  @Input() fc: FormControl;
  @Input() minValue: number;
  @Input() maxValue: number;

  constructor() {
  }

  isIncrementDisabled(): boolean {
    return this.fc.value >= this.maxValue;
  }

  isDecrementDisabled(): boolean {
    return this.fc.value <= this.minValue;
  }

  countIncrement(): void {
    let val = this.fc.value;
    val += 1;
    this.fc.setValue(val);
  }

  countDecrement(): void {
    let val = this.fc.value;
    val -= 1;
    this.fc.setValue(val);
  }
}
