import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[hccTestFocusout]'
})
export class TestFocusoutDirective {

  private _color = 'null';

  constructor(private readonly _elementRef: ElementRef) {}

  @HostListener('focusout') onFocusout() {
    this._color = this._color === 'null' ? 'yellow' : 'null';
    this.highlight(this._color);
  }

  private highlight(color: string) {
    this._elementRef.nativeElement.style.backgroundColor = color;
  }
}
