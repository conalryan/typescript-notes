import {Component, ElementRef, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-host-element',
  templateUrl: './my-host-element.component.html',
  styleUrls: ['./my-host-element.component.scss']
})
export class MyHostElementComponent implements OnInit {

  /**
   * ElementRef:
   * - Returned for any DOM element using ViewChild decorator.
   * - All components are hosted inside a custom DOM element and all directives are applied to DOM elements.
   * - Component and directive classes can obtain an instance of ElementRef associated with their host element through
   *   DI mechanism
   * @param {ElementRef} hostElement
   */
  constructor(private hostElement: ElementRef) {
    // outputs <app-my-host-element>...</app-my-host-element>
    console.log(`[MyHostElementComponent]::constructor::ElementRef.nativeElement.outerHTML::${this.hostElement.nativeElement.outerHTML}`);
  }

  ngOnInit() {
  }

}
