import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  ContentChild,
  DoCheck,
  OnInit
} from "@angular/core";
import { ChildComponent } from "./child.component";

@Component({
  selector: "app-child-wrapper",
  template: `
    <div>-- projected content begins --</div>
    <ng-content></ng-content>
    <div>-- projected content ends --</div>
  `
})
export class ChildWrapperComponent
  implements
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  myModel: string; // will get the value from the ChildComponent

  // Query for a CONTENT child of type `ChildComponent`
  @ContentChild(ChildComponent)
  contentChild: ChildComponent;

  constructor() {}

  ngOnInit(): void {
    console.warn("ChildWrapperComponent ngOnInit() { contentChild } ");
    console.log(this.contentChild);
    this.myModel = this.contentChild.myModel;
    console.log(this.myModel);
  }

  ngDoCheck(): void {
    console.warn("ChildWrapperComponent ngDoCheck() { contentChild } ");
    console.log(this.contentChild);
    this.myModel = this.contentChild.myModel;
    console.log(this.myModel);
  }

  ngAfterContentInit(): void {
    console.warn(
      "ChildWrapperComponent ngAfterContentInit() { contentChild } "
    );
    console.log(this.contentChild);
    this.myModel = this.contentChild.myModel;
    console.log(this.myModel);
  }

  ngAfterContentChecked(): void {
    console.warn(
      "ChildWrapperComponent ngAfterContentChecked() { contentChild } "
    );
    console.log(this.contentChild);
    this.myModel = this.contentChild.myModel;
    console.log(this.myModel);
  }

  ngAfterViewInit(): void {
    console.warn("ChildWrapperComponent ngAfterViewInit() { contentChild } ");
    console.log(this.contentChild);
    this.myModel = this.contentChild.myModel;
    console.log(this.myModel);
  }

  ngAfterViewChecked(): void {
    console.warn(
      "ChildWrapperComponent ngAfterViewChecked() { contentChild } "
    );
    console.log(this.contentChild);
    this.myModel = this.contentChild.myModel;
    console.log(this.myModel);
  }
}
