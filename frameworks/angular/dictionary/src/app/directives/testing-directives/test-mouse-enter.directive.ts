import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[hccTestMouseEnter]'
})
export class TestMouseEnterDirective {

  private _color = 'null';

  constructor(private readonly _elementRef: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter() {
    this._color = this._color === 'null' ? 'yellow' : 'null';
    this.highlight(this._color);
  }

  private highlight(color: string) {
    this._elementRef.nativeElement.style.backgroundColor = color;
  }
}
