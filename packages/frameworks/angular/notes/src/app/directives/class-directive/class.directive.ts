import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  /**
   * Use '.someName' to match class CSS selector. Angular guide recommends using lowerCamcelCase for naming.
   */
  selector: '.classDirective'
})
export class ClassDirective {
  /**
   * ElementRef:
   * - Gives the directive direct access to the DOM element upon which it’s attached.
   * - ElementRef itself is a wrapper for the actual DOM element which we can access via the property
   *   nativeElement, like so: el.nativeElement.style.backgroundColor = "gray";
   *
   * Renderer:
   * - Angular has been built from the ground up to work in a number of different environments,
   *   including server side via node and on a native mobile device
   * - Angular provides a platform independent way of setting properties on our elements via Renderer.
   * - In the future if we wanted to render our application on a platform other than a web browser then
   *   the Renderer calls the appropriate functions to change the background color on that platform.
   *   We are not limited to only being run in a web browser with a DOM.
   *
   * @param {ElementRef} el
   * @param {Renderer2} renderer
   */
  constructor(private el: ElementRef, private renderer: Renderer2) {
    // It's possible to manipulate the DOM directly by accessing nativeElement, although it's a BAD IDEA!
    // el.nativeElement.style.backgroundColor = 'gray';

    // Instead of setting the background color directly via the DOM element we do it by going through the renderer.
    renderer.setStyle(el.nativeElement, 'backgroundColor', 'gray');

    // Debug
    console.log('ClassDirective constructor() { ElementRef ]');
    console.log(el);

    console.log('ClassDirective constructor() { Renderer ]');
    console.log(renderer);
  }
}
