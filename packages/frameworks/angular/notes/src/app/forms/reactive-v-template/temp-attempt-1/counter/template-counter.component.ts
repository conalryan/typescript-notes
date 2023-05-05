import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-template-counter',
  templateUrl: './template-counter.component.html',
  styleUrls: ['./template-counter.component.scss']
})
export class TemplateCounterComponent {

  @Input() count: number;
  @Input() minValue = 0;
  @Input() maxValue = 10;

  constructor() {
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
