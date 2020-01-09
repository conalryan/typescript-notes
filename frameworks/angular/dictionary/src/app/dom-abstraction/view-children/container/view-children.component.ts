import {
  AfterContentChecked,
  AfterViewInit,
  Component,
  ElementRef,
  QueryList,
  ViewChildren,
  ViewContainerRef
} from "@angular/core";
import { ChildComponent } from "../components/child.component";

@Component({
  selector: "app-view-children",
  template: `
    <div><p>paragraph inside div 1 is here</p></div>
    <div><p>paragraph inside div 2 is here</p></div>

    <app-child></app-child>
    <app-child type="danger"></app-child>
    <app-child type="info"></app-child>
  `
})
export class ViewChildrenComponent
  implements AfterContentChecked, AfterViewInit {
  @ViewChildren("div")
  divs: QueryList<any>;
  @ViewChildren(ChildComponent)
  myChildComponents: QueryList<ChildComponent>;
  @ViewChildren(ChildComponent, { read: ElementRef })
  myChildComponentElements: QueryList<ChildComponent>;
  @ViewChildren(ChildComponent, { read: ViewContainerRef })
  myChildComponentViewRefs: QueryList<ChildComponent>;

  constructor() {}

  /**
   * QueryList<> is undefined until AfterViewInit lifecycle hook
   */
  ngAfterContentChecked() {
    console.log(`[Parent] ngAfterContentChecked() { divs }`);
    console.log(this.divs); // undefined

    console.log(`[Parent] ngAfterContentChecked() { myChildComponents }`);
    console.log(this.myChildComponents); // undefined

    console.log(
      `[Parent] ngAfterContentChecked() { myChildComponentElements }`
    );
    console.log(this.myChildComponentElements); // undefined

    console.log(
      `[Parent] ngAfterContentChecked() { myChildComponentViewRefs }`
    );
    console.log(this.myChildComponentViewRefs); // undefined
  }

  /**
   * QueryList<> is updated AfterViewInit
   */
  ngAfterViewInit() {
    console.log(`[Parent] ngAfterViewInit() { divs }`);
    console.log(this.divs);
    this.divs.forEach(div => {
      console.log(`[Parent] ngAfterViewInit() { div }`);
      console.log(div);
    });

    console.log(`[Parent] ngAfterViewInit() { myChildComponents }`);
    console.log(this.myChildComponents);
    this.myChildComponents.forEach(myChildComponent => {
      console.log(`[Parent] ngAfterViewInit() { myChildComponent }`);
      console.log(myChildComponent);
    });

    console.log(`[Parent] ngAfterViewInit() { myChildComponentElements }`);
    console.log(this.myChildComponentElements);
    this.myChildComponentElements.forEach(myChildComponentElement => {
      console.log(`[Parent] ngAfterViewInit() { myChildComponentElement }`);
      console.log(myChildComponentElement);
    });

    console.log(`[Parent] ngAfterViewInit() { myChildComponentViewRefs }`);
    console.log(this.myChildComponentViewRefs);
    this.myChildComponentViewRefs.forEach(myChildComponentViewRef => {
      console.log(`[Parent] ngAfterViewInit() { myChildComponentViewRef }`);
      console.log(myChildComponentViewRef);
    });
  }
}
