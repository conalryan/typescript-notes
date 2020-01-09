import {
  Component,
  OnInit,
  ViewChildren,
  OnChanges,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  ElementRef,
  QueryList,
  Renderer2
} from "@angular/core";

@Component({
  selector: "app-dom-manipulation-container",
  template: `
    <button (click)="remove()">Remove child component</button>
    <a-comp #c></a-comp>
  `
})
// tslint:disable-next-line:component-class-suffix
export class DomManipulationContainer
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  @ViewChildren("c", { read: ElementRef })
  childComps: QueryList<ElementRef>;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
    console.warn("app-root 0", this.hostElement);
  }

  ngOnChanges() {
    console.warn("app-root 1", this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('2 number of child components: ' + this.childComps.length);
  }

  ngOnInit() {
    console.warn("app-root 2", this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('2 number of child components: ' + this.childComps.length);
  }

  ngDoCheck() {
    console.warn("app-root 3", this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('3 number of child components: ' + this.childComps.length);
  }

  ngAfterContentInit() {
    console.warn("app-root 4", this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('4 number of child components: ' + this.childComps.length);
  }

  ngAfterContentChecked() {
    console.warn("app-root 5", this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('5 number of child components: ' + this.childComps.length);
  }

  ngAfterViewInit() {
    console.warn("app-root 6", this.hostElement);
    console.warn("6 number of child components: " + this.childComps.length);
  }

  ngAfterViewChecked() {
    console.warn("app-root 7", this.hostElement);
    console.warn("7 number of child components: " + this.childComps.length);
  }

  remove() {
    this.renderer.removeChild(
      this.hostElement.nativeElement,
      this.childComps.first.nativeElement
    );
  }
}
