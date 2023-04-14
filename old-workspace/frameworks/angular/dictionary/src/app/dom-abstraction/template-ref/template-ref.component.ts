import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";

/**
 * ````typescript
 * export declare abstract class TemplateRef<C> {
    /**
     * The location in the View where the Embedded View logically belongs to.
     *
     * The data-binding and injection contexts of Embedded Views created from this `TemplateRef`
     * inherit from the contexts of this location.
     *
     * Typically new Embedded Views are attached to the View Container of this location, but in
     * advanced use-cases, the View can be attached to a different container while keeping the
     * data-binding and injection context from the original location.
     *
     *
 *  readonly abstract elementRef: ElementRef;
 *  abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;
 * }
 * ````
 */
@Component({
  selector: "app-template-ref",
  templateUrl: "./template-ref.component.html"
})
export class TemplateRefComponent
  implements
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  dynamicValue = 22;

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
  @ViewChild("myNgTemplateRef")
  ngTplRef: TemplateRef<any>;
  // or with read parameter of TemplateRef<>:
  // @ViewChild('myNgTemplateRef', {read: TemplateRef<any>}) ngTplRef: TemplateRef<any>;

  /**
   * class ViewContainerRef {
   * ...
   * clear() : void
   * insert(viewRef: ViewRef, index?: number) : ViewRef
   * get(index: number) : ViewRef
   * indexOf(viewRef: ViewRef) : number
   * detach(index?: number) : ViewRef
   * move(viewRef: ViewRef, currentIndex: number) : ViewRef
   * }
   */
  @ViewChild("myNgContainerRef", { read: ViewContainerRef })
  ngViewContainerRef: ViewContainerRef;

  constructor() {
    console.log(
      `[TemplateRefComponent] constructor() { ngTplRef, ngViewContainerRef }`
    );
    console.log(this.ngTplRef); // undefined
    console.log(this.ngViewContainerRef); // undefined
  }

  ngOnInit() {
    console.log(
      `[TemplateRefComponent] ngOnInit() { ngTplRef, ngViewContainerRef }`
    );
    console.log(this.ngTplRef);
    console.log(this.ngViewContainerRef);

    const view = this.ngTplRef.createEmbeddedView(null);
    /**
     * Inserting template actually creates a comment <!-- --> in the DOM and appends the template to it.
     * This is so Angular is not creating a bunch of extra Elements to bind templates to.
     */
    this.ngViewContainerRef.insert(view);
  }

  ngDoCheck() {
    console.log(
      `[TemplateRefComponent] ngDoCheck() { ngTplRef, ngViewContainerRef }`
    );
    console.log(this.ngTplRef);
    console.log(this.ngViewContainerRef);
  }

  ngAfterContentInit() {
    console.log(
      `[TemplateRefComponent] ngAfterContentInit() { ngTplRef, ngViewContainerRef }`
    );
    console.log(this.ngTplRef);
    console.log(this.ngViewContainerRef);
  }

  ngAfterContentChecked() {
    console.log(
      `[TemplateRefComponent] ngAfterContentChecked() { ngTplRef, ngViewContainerRef }`
    );
    console.log(this.ngTplRef);
    console.log(this.ngViewContainerRef);
  }

  ngAfterViewInit() {
    console.log(
      `[TemplateRefComponent] ngAfterViewInit() { ngTplRef, ngViewContainerRef }`
    );
    console.log(this.ngTplRef);
    console.log(this.ngViewContainerRef);
  }

  ngAfterViewChecked() {
    console.log(
      `[TemplateRefComponent] ngAfterViewChecked() { ngTplRef, ngViewContainerRef }`
    );
    console.log(this.ngTplRef);
    console.log(this.ngViewContainerRef);
  }
}
