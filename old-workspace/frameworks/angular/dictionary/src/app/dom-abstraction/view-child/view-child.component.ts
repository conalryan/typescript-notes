import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from "@angular/core";

@Component({
  selector: "app-view-child",
  template: `
    <span #templateRefVariable>I am span</span>
  `
})
export class ViewChildComponent
  implements
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  /**
   * @ViewChild([reference from template], {read: [reference type]});
   * - Access Angular view abstraction in component or directive with DOM queries.
   * - [reference from template]:
   *   - Template Reference Variable (e.g. <span #myTemplateRef>I am span</span>)
   * - {read: [reference type]}:
   *   - Not always required, since Angular can infer the reference type.
   *   - ElementRef and TemplateRef are not required to pass reference type.
   *   - ViewContainerRef requires to be specified in read parameter.
   *   - ViewRef cannot be returned from the DOM and have to be constructed manually.
   */
  @ViewChild("templateRefVariable", { read: ElementRef })
  elementRef: ElementRef;
  // or without read parameter for ElementRef:
  // @ViewChild('myElementRef') elmRef: ElementRef;

  constructor() {
    console.log(`[ViewChildComponent] constructor() { ElementRef }`);
    console.log(this.elementRef); // undefined
  }

  ngOnInit() {
    console.log(`[ViewChildComponent] ngOnInit() { ElementRef }`);
    console.log(this.elementRef);
  }

  ngDoCheck() {
    console.log(`[ViewChildComponent] ngDoCheck() { ElementRef }`);
    console.log(this.elementRef);
  }

  ngAfterContentInit() {
    console.log(`[ViewChildComponent] ngAfterContentInit() { ElementRef }`);
    console.log(this.elementRef);
  }

  ngAfterContentChecked() {
    console.log(`[ViewChildComponent] ngAfterContentChecked() { ElementRef }`);
    console.log(this.elementRef);
  }

  ngAfterViewInit(): void {
    console.log(`[ViewChildComponent] ngAfterViewInit() { ElementRef }`);
    console.log(this.elementRef);
    // outputs `I am span`
    console.log(
      `[ViewChildComponent] ngAfterViewInit() { ElementRef.nativeElement.textContent }`
    );
    console.log(this.elementRef.nativeElement.textContent);
  }

  ngAfterViewChecked() {
    console.log(`[ViewChildComponent] ngAfterViewChecked() { ElementRef }`);
  }
}
