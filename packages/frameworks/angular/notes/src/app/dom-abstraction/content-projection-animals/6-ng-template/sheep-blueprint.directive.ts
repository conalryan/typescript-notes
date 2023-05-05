import { Directive, TemplateRef, ElementRef, Renderer2, ViewContainerRef } from '@angular/core';
import { PastureNgTemplateComponent } from './pasture-ng-template.component';

/**
 *
 */
@Directive({
  selector: '[appSheepBlueprint]'
})
export class SheepBlueprintDirective {

  constructor(private el: ElementRef, private renderer: Renderer2, private templateRef: TemplateRef<void>, private viewContainer: ViewContainerRef, private pastureNgTemplateComponent: PastureNgTemplateComponent) {
    // Debug
    console.log('constructor() { ElementRef }');
    console.log(el);

    console.log('constructor() { Renderer }');
    console.log(renderer);

    console.log('constructor() { TemplateRef<void> }');
    console.log(templateRef);

    console.log('constructor() { ViewContainerRef }');
    console.log(viewContainer);

    console.log('constructor() { PastureNgTemplateComponent }');
    console.log(pastureNgTemplateComponent);

    pastureNgTemplateComponent.sheepTemplate = templateRef;
  }
}
