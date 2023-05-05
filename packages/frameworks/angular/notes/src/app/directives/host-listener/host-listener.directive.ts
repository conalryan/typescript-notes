import { Directive, HostListener } from "@angular/core";

@Directive({
  selector: "[hostListenerEx]"
})
export class HostListenerExDirective {
  constructor() {
    console.log("[HostListenerExDirective] constructor() { }");
  }

  /**
   * Angular will invoke the decorated method when the host element emits the specified event.
   *
   * If the decorated method returns `false`, then `preventDefault` is applied on the DOM event.
   * Detect if an event is firing on the host element.
   *
   * WARNING:
   * https://github.com/angular/angular/issues/16366
   * You CANNOT remove the host listener.
   * Do NOT use this if you will have a lot of directives on the page
   *
   * Alternative:
   * Rx.Observable.fromEvent(document, 'click') in someService and directive will subscribe and unsubscribe to it.
   */
  @HostListener("mouseover")
  onHover() {
    window.alert("hover");
  }
}

/**
 * Angular example from directives.d.ts docs
 */
@Directive({
  selector: "button[counting]"
})
export class CountingDirective {
  numberOfClicks = 0;

  @HostListener("click", ["$event.target"])
  onClick(btn: any) {
    console.log("button", btn, "number of clicks:", this.numberOfClicks++);
  }
}
