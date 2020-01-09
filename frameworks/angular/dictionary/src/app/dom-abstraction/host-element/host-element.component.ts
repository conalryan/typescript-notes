import {
  AfterViewInit,
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild
} from "@angular/core";

@Component({
  selector: "app-host-element",
  template: `
    <p>
      host-element works!
      Check the console.log
    </p>
    <!--
      Template Reference Variable:
      - Named reference to a DOM element within a template.
      - Use @ViewChild in component/directive to access it.
    -->
    <span #myElementRef>I am span</span>
  `
})
export class HostElementComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild("myElementRef")
  elmRef: ElementRef;

  /**
   * ElementRef:
   * - Returned for any DOM element using ViewChild decorator.
   * - All components are hosted inside a custom DOM element and all directives are applied to DOM elements.
   * - Component and directive classes can obtain an instance of ElementRef associated with their host element through
   *   DI mechanism
   * @param {ElementRef} hostElement
   */
  constructor(private hostElementRef: ElementRef) {
    // outputs <app-host-element>...</app-host-element>
    console.log(`[HostElementComponent]::constructor(hostElementRef: ElementRef){ hostElementRef.nativeElement.outerHTML }::
      ${this.hostElementRef.nativeElement.outerHTML}`);
    console.log(hostElementRef);

    // Cannnot access inner host element in the constructor:
    // throws: ERROR Error: Uncaught (in promise): TypeError: Cannot read property 'nativeElement' of undefined
    // console.log(`[HostElementComponent] constructor() { this.elmRef.nativeElement.outerHTML } ${this.elmRef.nativeElement.outerHTML}`);
    // console.log(this.elmRef);
  }

  ngOnInit() {
    console.log("[HostElementComponent]::ngOnInit()");
    console.log(this.hostElementRef);
  }

  ngOnChanges() {
    console.log("[HostElementComponent]::ngOnChanges()");
  }

  /**
   * Compare the hostElement of the entire component vs. an inner elementRef
   */
  ngAfterViewInit(): void {
    console.log(`[ElementRefComponent]::ngAfterViewInit::ElementRef::`);
    console.log(this.elmRef);
    // outputs `I am span`
    console.log(
      `[ElementRefComponent]::ngAfterViewInit::ElementRef.nativeElement.textContent::`
    );
    console.log(this.elmRef.nativeElement.textContent);
  }
}
