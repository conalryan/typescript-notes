import {
  Component,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked
} from "@angular/core";

@Component({
  selector: "app-child",
  template: `
  <input [(ngModel)]="myModel">
  `
})
export class ChildComponent
  implements
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  myModel = "Simple model";

  constructor() {}

  ngOnInit(): void {
    console.warn("ChildComponent ngOnInit() { contentChild } ");
    console.log(this.myModel);
  }

  ngDoCheck(): void {
    console.warn("ChildComponent ngDoCheck() { contentChild } ");
    console.log(this.myModel);
  }

  ngAfterContentInit(): void {
    console.warn("ChildComponent ngAfterContentInit() { contentChild } ");
    console.log(this.myModel);
  }

  ngAfterContentChecked(): void {
    console.warn("ChildComponent ngAfterContentChecked() { contentChild } ");
    console.log(this.myModel);
  }

  ngAfterViewInit(): void {
    console.warn("ChildComponent ngAfterViewInit() { contentChild } ");
    console.log(this.myModel);
  }

  ngAfterViewChecked(): void {
    console.warn("ChildComponent ngAfterViewChecked() { contentChild } ");
    console.log(this.myModel);
  }
}
