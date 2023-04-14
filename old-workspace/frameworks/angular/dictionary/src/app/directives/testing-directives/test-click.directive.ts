import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[hccTestClick]'
})
export class TestClickDirective {

  private _color = 'null';

  constructor(private readonly _elementRef: ElementRef) {}

  @HostListener('click') onClick() {
    this._color = this._color === 'null' ? 'yellow' : 'null';
    this.highlight(this._color);
  }

  private highlight(color: string) {
    this._elementRef.nativeElement.style.backgroundColor = color;
  }
}
