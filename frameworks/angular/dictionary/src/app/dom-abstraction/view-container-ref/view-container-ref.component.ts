import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef
} from "@angular/core";
import { ExEntryComponent } from "./entry-component/ex-entry.component";

@Component({
  selector: "app-view-container-ref",
  templateUrl: "./view-container-ref.component.html"
})
export class ViewContainerRefComponent implements OnInit, AfterViewInit {
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
   *
   * class ViewContainerRef {
   *   ...
   *   clear() : void
   *   insert(viewRef: ViewRef, index?: number) : ViewRef
   *   get(index: number) : ViewRef
   *   indexOf(viewRef: ViewRef) : number
   *   detach(index?: number) : ViewRef
   *   move(viewRef: ViewRef, currentIndex: number) : ViewRef
   * }
   */
  @ViewChild("myNgContainer", { read: ViewContainerRef })
  viewContRef: ViewContainerRef;
  @ViewChild("tplRef")
  tplRef: TemplateRef<any>;

  /**
   * myNgContainer above is used for the template ref example.
   * 2nd <ng-container> myNgContainerForComp is used for component view.
   */
  @ViewChild("myNgContainerForComp", { read: ViewContainerRef })
  viewContRefForComp: ViewContainerRef;

  constructor(private resolver: ComponentFactoryResolver) {}

  /**
   * Create Host View
   *
   * ComponentFactoryResolver:
   * - ViewContainerRef.createComponent
   */
  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(ExEntryComponent);
    this.viewContRefForComp.createComponent(factory);
  }

  /**
   * Create an embedded view
   */
  ngAfterViewInit(): void {
    // outputs `ViewContainerRef`
    console.log(
      `[ElementRefComponent]::ngAfterViewInit::@ViewChild::myNgContainer::`
    );
    console.log(this.viewContRef);

    const view = this.tplRef.createEmbeddedView(null);
    this.viewContRef.insert(view);
  }
}
