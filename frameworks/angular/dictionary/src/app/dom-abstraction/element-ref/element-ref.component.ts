import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild
} from "@angular/core";

/**
 * https://angular.io/api/core/ElementRef
 *
 * A wrapper around a native element inside of a View.
 *
 * An `ElementRef` is backed by a render-specific element. In the browser, this is usually a DOM
 * element.
 *
 * @security Permitting direct access to the DOM can make your application more vulnerable to
 * XSS attacks. Carefully review any use of `ElementRef` in your code. For more detail, see the
 * [Security Guide](http://g.co/ng/security).
 *
 * nativeElement:
 * The underlying native element or `null` if direct access to native elements is not supported
 * (e.g. when the application runs in a web worker).
 *
 * Use this API as the last resort when direct access to DOM is needed. Use templating and
 * data-binding provided by Angular instead. Alternatively you can take a look at {@link Renderer2}
 * which provides API that can safely be used even when direct access to native elements is not
 * supported.
 *
 * Relying on direct DOM access creates tight coupling between your application and rendering
 * layers which will make it impossible to separate the two and deploy your application into a
 * web worker.
 *
 * ````typescript
 * export declare class ElementRef {
 *   nativeElement: any;
 *   constructor(nativeElement: any);
 * }
 * ````
 */
@Component({
  selector: "app-element-ref",
  templateUrl: "./element-ref.component.html"
})
export class ElementRefComponent
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
  @ViewChild("myElementRef", { read: ElementRef })
  elmRef: ElementRef;
  // or without read parameter for ElementRef:
  // @ViewChild('myElementRef') elmRef: ElementRef;

  constructor() {
    console.log(`[ElementRefComponent] constructor() { ElementRef }`);
    console.log(this.elmRef); // undefined
  }

  ngOnInit() {
    console.log(`[ElementRefComponent] ngOnInit() { ElementRef }`);
    console.log(this.elmRef);
  }

  ngDoCheck(): void {
    console.log(`[ElementRefComponent] ngDoCheck() { ElementRef }`);
    console.log(this.elmRef);
  }

  ngAfterViewInit(): void {
    console.log(`[ElementRefComponent] ngAfterViewInit() { ElementRef }`);
    console.log(this.elmRef);
    // outputs `I am span`
    console.log(
      `[ElementRefComponent] ngAfterViewInit() { ElementRef.nativeElement.textContent }`
    );
    console.log(this.elmRef.nativeElement.textContent);
  }

  ngAfterContentInit(): void {
    console.log(`[ElementRefComponent] ngAfterContentInit() { ElementRef }`);
    console.log(this.elmRef);
  }

  ngAfterContentChecked(): void {
    console.log(`[ElementRefComponent] ngAfterContentChecked() { ElementRef }`);
    console.log(this.elmRef);
  }

  ngAfterViewChecked(): void {
    console.log(`[ElementRefComponent] ngAfterViewChecked() { ElementRef }`);
    console.log(this.elmRef);
  }
}
