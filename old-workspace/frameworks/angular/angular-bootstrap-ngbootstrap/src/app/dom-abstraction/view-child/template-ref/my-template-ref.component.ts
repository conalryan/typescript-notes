import {AfterViewInit, Component, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-my-template-ref',
  templateUrl: './my-template-ref.component.html',
  styleUrls: ['./my-template-ref.component.scss']
})
export class MyTemplateRefComponent implements OnInit, AfterViewInit {

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
  @ViewChild('ngTemplateRef') ngTplRef: TemplateRef<any>;

  constructor() { }

  ngOnInit() {
  }

  /**
   * TODO: Explain why this is only available AfterViewInit
   */
  ngAfterViewInit() {
    const elementRef = this.ngTplRef.elementRef;
    console.log(`[MyTemplateRefComponent]::ngAfterViewInit::ngTplRef.elementRef::${elementRef}`);
  }
}
