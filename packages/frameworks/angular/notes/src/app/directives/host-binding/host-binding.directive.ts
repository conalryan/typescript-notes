import { Directive, HostBinding, HostListener } from "@angular/core";
import { NgModel } from "@angular/forms";

@Directive({
  selector: "[hostBindingEx]"
})
export class HostBindingExDirective {
  initColor = "red";

  constructor() {}

  /**
   * @HostBinding lets you set properties on the element or component that hosts the directive
   *
   * Angular automatically checks host property bindings during change detection.
   * If a binding changes, it will update the host element of the directive.
   *
   * e.g.
   * @HostBinding(‘class.active’)
   * @HostBinding(‘disabled’)
   * @HostBinding(‘attr.role’)
   */
  @HostBinding("style.color")
  color: string = '';
  @HostBinding("style.border-color")
  borderColor: string = '';

  @HostListener("keydown")
  newColor() {
    this.color = this.borderColor = this.initColor === "red" ? "blue" : "red";
  }
}

/**
 * Example from Angular directive.d.ts
 */
@Directive({
  selector: "[ngModelEx]"
})
export class NgModelEx {
  constructor(public control: NgModel) {
    console.log("NgModelEx constructor() { NgModel }");
    console.log(control);
  }

  @HostBinding("class.valid")
  get valid() {
    return this.control.valid;
  }
  @HostBinding("class.invalid")
  get invalid() {
    return this.control.invalid;
  }
}
