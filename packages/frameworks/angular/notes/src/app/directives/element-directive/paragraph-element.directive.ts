import { Directive, ElementRef, Renderer2 } from '@angular/core';

@Directive({
  selector: 'p'
})
export class ParagraphElementDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {
    renderer.setStyle(el.nativeElement, 'border', '1px solid red');

    // Debug
    console.log('ParagraphElementDirective constructor() { ElementRef ]');
    console.log(el);

    console.log('ParagraphElementDirective constructor() { Renderer ]');
    console.log(renderer);
  }
}
