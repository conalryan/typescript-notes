import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Renderer2
} from "@angular/core";

/**
 * https://codecraft.tv/courses/angular/custom-directives/creating-a-custom-directive/
 */
@Directive({
  /**
   * The CSS selector that triggers the instantiation of a directive.
   *
   * Angular only allows directives to trigger on CSS selectors that do not cross element
   * boundaries.
   *
   * `selector` may be declared as one of the following:
   *
   * - `element-name`: select by element name.
   * - `.class`: select by class name.
   * - `[attribute]`: select by attribute name.
   * - `[attribute=value]`: select by attribute name and value.
   * - `:not(sub_selector)`: select only if the element does not match the `sub_selector`.
   * - `selector1, selector2`: select if either `selector1` or `selector2` matches.
   */
  selector: "[cardHover]"
})
export class CardHoverDirective {
  /**
   * Use:
   * ```html
   * myCardHover
   * [config]="{querySelector: '.card-text'}"
   * ```
   * or
   * ```html
   * [myCardHover]="{querySelector: '.card-text'}"
   * ```
   *
   * @type {{querySelector: string}}
   */
  @Input("cardHover")
  config = {
    querySelector: ".card-text"
  };

  @HostBinding("class.card-outline-primary")
  private ishovering: boolean = false;

  /**
   * ElementRef:
   * - Gives the directive direct access to the DOM element upon which it’s attached.
   * - ElementRef itself is a wrapper for the actual DOM element which we can access via the property
   *   nativeElement, like so: el.nativeElement.style.backgroundColor = "gray";
   *
   * Renderer:
   * - Angular has been built from the ground up to work in a number of different environments,
   *   including server side via node and on a native mobile device.
   * - Angular provides a platform independent way of setting properties on our elements via Renderer.
   *
   * @param {ElementRef} el
   * @param {Renderer} renderer
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Do NOT use nativeElement! Security Risk and tight coupling to browser.
    // el.nativeElement.style.backgroundColor = "gray";

    // Instead of setting the background color directly via the DOM element we do it by going through the renderer.
    renderer.setStyle(el.nativeElement, "backgroundColor", "gray");

    // Debug
    console.log("CardHoverDirective constructor() { Renderer ]");
    console.log(renderer);
  }

  /**
   * Detect if an event is firing on the host element.
   */
  @HostListener("mouseover")
  onMouseOver() {
    const part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setStyle(part, "display", "block");
    this.ishovering = true;
  }

  @HostListener("mouseout")
  onMouseOut() {
    const part = this.el.nativeElement.querySelector(this.config.querySelector);
    this.renderer.setStyle(part, "display", "none");
    this.ishovering = false;
  }
}
