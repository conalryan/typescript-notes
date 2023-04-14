import { Directive, Input, TemplateRef, ViewContainerRef } from "@angular/core";

/**
 * Note you will need to apply the directive via *myIf otherwise you'll get error:
 * NullInjectorError: No provider for TemplateRef!
 * e.g. <p *myIf="shouldDisplay">my-if works!</p>
 */
@Directive({
  selector: "[if]"
})
export class IfDirective {
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef
  ) {}

  @Input()
  set if(condition: boolean) {
    if (condition) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }
}
