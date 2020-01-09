import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-my-element-ref',
  templateUrl: './my-element-ref.component.html',
  styleUrls: ['./my-element-ref.component.scss']
})
export class MyElementRefComponent implements OnInit, AfterViewInit {

  /**
   * @ViewChild([reference from template], {read: [reference type]});
   * - Access Angular view abstraction in component or directive with DOM queries.
   * - [reference from template]:
   *   - Template Reference Variable (e.g. <span #myTemplateRef>I am span</span>)
   * - {read: [reference type]}:
   *   - Not always required, since Angular can infer the reference type.
   *   - ElementRef and TemplateRef are not required to pass reference type.
   *   - ViewContainerRef requires to be specified in read parameter.
   *   - ViewRef cannot be returned from the DOM and have to be constructed manually.
   */
  @ViewChild('myElementRef', {read: ElementRef}) elmRef: ElementRef;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    // outputs `I am span`
    console.log(`[MyElementRefComponent]::ngAfterViewInit::elmRef.nativeElement.textContent::${this.elmRef.nativeElement.textContent}`);
  }

}
