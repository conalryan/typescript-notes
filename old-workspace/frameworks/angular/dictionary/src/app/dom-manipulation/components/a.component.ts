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
  selector: 'a-comp',
  template: `
    <div>I am A component</div>
    <b-comp></b-comp>
  `
})
export class AComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  constructor(private hostElement: ElementRef) {
    console.warn('a 0', hostElement);
  }

  ngOnChanges() {
    console.warn('a 1', this.hostElement);
  }

  ngOnInit() {
    console.warn('a 2', this.hostElement);
  }

  ngDoCheck() {
    console.warn('a 3', this.hostElement);
  }

  ngAfterContentInit() {
    console.warn('a 4', this.hostElement);
  }

  ngAfterContentChecked() {
    console.warn('a 5', this.hostElement);
  }

  ngAfterViewInit() {
    console.warn('a 6', this.hostElement);
  }

  ngAfterViewChecked() {
    console.warn('a 7', this.hostElement);
  }
}
