import {
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  Component,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'b-comp',
  template: `
    <div>I am B component</div>
  `
})
export class BComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  constructor(private hostElement: ElementRef) {
    console.warn('b 0', hostElement);
  }

  ngOnChanges() {
    console.warn('b 1', this.hostElement);
  }

  ngOnInit() {
    console.warn('b 2', this.hostElement);
  }

  ngDoCheck() {
    console.warn('b 3', this.hostElement);
  }

  ngAfterContentInit() {
    console.warn('b 4', this.hostElement);
  }

  ngAfterContentChecked() {
    console.warn('b 5', this.hostElement);
  }

  ngAfterViewInit() {
    console.warn('b 6', this.hostElement);
  }

  ngAfterViewChecked() {
    console.warn('b 7', this.hostElement);
  }
}
