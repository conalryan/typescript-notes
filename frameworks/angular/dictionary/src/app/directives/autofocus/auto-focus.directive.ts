import {AfterViewInit, Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appAutoFocus]'
})
export class AutoFocusDirective implements AfterViewInit {

  constructor(private el: ElementRef) {
    console.log('--> constructor(ElementRef)');
    console.log(el);
  }

  ngAfterViewInit() {
    console.log('--> AfterViewInit()');
    this.el.nativeElement.focus();
  }

}
