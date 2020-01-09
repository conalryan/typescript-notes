# Dom Manipulation Workshop
https://www.youtube.com/watch?v=vz9cNCkaPsY&list=PLSqfisWkiKJj7_PkY9b1c_7mZhmbhvwOA&index=2&t=530s
https://github.com/maximusk/dom-manipulation-workshop

## Dom Operations
1. Modifying DOM element properties.
  - classList.add()
  - setAttribute()
  - style.setProperty()
2. Modifying DOM hierarchy
  - createElement()
  - Remove()
  - appendChild()
  - removeChild()

## Presentation Logic
- How business data should be presented to the user (aka how components are layed out on the screen).
- Recommended to put it into components. 

## Renderring Logic
- Manipulates DOM; arranges DOM nodes in a particular order.
- Recommended to put it in directives.

## Problem 1
- I need to be able to change an element property base on dynamic data.

### Solution 1a Component
- Component can set the element attribute (AfterViewInit).
- **WHY?** Not sure why author says you can set it afterViewInit when you can set it in OnInit!
```typescript
iimport { Component, ViewChild, ElementRef, OnChanges, OnInit, DoCheck, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<span #el>I want to be green</span>`,
  styles: ['[highlight] {color: green}']
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterViewInit {

  @ViewChild('el') elm: ElementRef;

  /**
   * Neve called, there ain't no inputs yo.
   */
  ngOnChanges() {
    console.warn('1');
    console.log(this.elm);
    this.elm.nativeElement.setAttribute('highlight', '');
  }

  /**
   * Upated DOM!
   */
  ngOnInit() {
    console.warn('2');
    console.log(this.elm);
    this.elm.nativeElement.setAttribute('highlight', '');
  }

  /**
   * Upated DOM!
   */
  ngDoCheck() {
    console.warn('3');
    console.log(this.elm);
    // this.elm.nativeElement.setAttribute('highlight', '');
  }

  /**
   * Upated DOM!
   */
  ngAfterViewInit() {
    console.warn('4');
    console.log(this.elm);
    // this.elm.nativeElement.setAttribute('highlight', '');
  }
}
```

Rather than use @ViewChild to search for a given dom element, with directives you can pass elementRef directly into the constructor.

### Solution 1b Directive
- Directive
- ```typescript
import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[addAttribute]'
})
export class AddAttributeDirective {
  @Input() addAttribute;

  constructor(private element: ElementRef) {
  }

  ngOnInit() {
    this.element.nativeElement.setAttribute(this.addAttribute, '');
  }
}
```
- Component using the directive
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<span [addAttribute]="'highlight'">I want to be red</span>`,
  styles: ['[highlight] {color: red}']
})
export class AppComponent {
}
```

### Solution 1c Renderer2
- Directive;
```typescript
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[addAttribute]'
})
export class AddAttributeDirective implements OnInit {
  @Input() addAttribute;

  constructor(private element: ElementRef, private renderer: Renderer2) {
  }

  ngOnInit() {
    this.renderer.setAttribute(this.element.nativeElement, this.addAttribute, '');
  }
}
```

## Modifying DOM Structure

### Views
1. Host View
  - Can be standalone or part of a ViewContainer.
  - Transfering component to view: Metadata -> ViewFactory -> View (Host View).
2. Embedded View
  - Created using a template.
  - Always part of a ViewContainer.

### Problem 2 Remove DOM Element
- I need to remove a child element.

### Solution 2a Component Removes DOM Element with Renderer2
```typescript
import {
  OnChanges,
  OnInit,
  DoCheck,
  AfterContentInit,
  AfterContentChecked,
  AfterViewInit,
  AfterViewChecked,
  Component, ElementRef, QueryList, Renderer2, ViewChildren
} from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="remove()">Remove child component</button>
    <a-comp #c></a-comp>
  `
})
export class AppComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {
  
  @ViewChildren('c', { read: ElementRef }) childComps: QueryList<ElementRef>;

  constructor(private hostElement: ElementRef, private renderer: Renderer2) {
    console.warn('app-root 0', this.hostElement);
  }

  ngOnChanges() {
    console.warn('app-root 1', this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('app-root 1 number of child components: ' + this.childComps.length);
  }

  ngOnInit() {
    console.warn('app-root 2', this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('app-root 2 number of child components: ' + this.childComps.length);
  }

  ngDoCheck() {
    console.warn('app-root 3', this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('app-root 3 number of child components: ' + this.childComps.length);
  }

  ngAfterContentInit() {
    console.warn('app-root 4', this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('app-root 4 number of child components: ' + this.childComps.length);
  }

  ngAfterContentChecked() {
    console.warn('app-root 5', this.hostElement);
    // ERROR TypeError: Cannot read property 'length' of undefined
    // console.warn('app-root 5 number of child components: ' + this.childComps.length);
  }

  ngAfterViewInit() {
    console.warn('app-root 6', this.hostElement);
    console.warn('app-root 6 number of child components: ' + this.childComps.length);
  }

  ngAfterViewChecked() {
    console.warn('app-root 7', this.hostElement);
    console.warn('app-root 7 number of child components: ' + this.childComps.length);
  }

  /**
   *
   */
  remove() {
    this.renderer.removeChild(
      this.hostElement.nativeElement,
      this.childComps.first.nativeElement
    );
  }
}
```
- Problem is that Angular will continue to run change detection on child nodes, even though they have been removed from the DOM!
- Put a breakpoint in checkAndUpdateView function of Angular.
```javacript
// core.js line 13793
function checkAndUpdateView(view) {
  // ...
}
```

If you create a DOM node, then you can remove them, because Angular doesn't know about it.
If you want to delete an Angular node, then you should use **viewContainer**.

### ViewContainer (ViewContainerRef)
- Angular api to allow you to manipulate views.
- DOM node/view can act as a container for other views.
- Makes DOM hierarchy changes safe create, destory, manipulate (e.g. structural directives ngIf, ngFor, etc. all based on view containers).
- Any DOM node can be a container, however usually it's ```html<ng-container></ngcontainer>``` since ng-container is rendered as a comment and we won't have extra DOM elements that aren't needed.
1. Create ViewContainer
```html
<ng-container #vc></ng-container>
```
```typescript
// read: ViewContainerRef turns the DOM element into a view container.
@ViewChild('vc', {read: ViewContainerRef}) vc;
```
2. Create Template
```html
<ng-template #tpl><span>I'm inside an ng-template</span></ng-template>
```
```typescript
@ViewChild('tpl', {read: TemplateRef}) templateRef: TemplateRef;
```
3. Pass Template to ViewContainer to Create Embedded View
```typescript
ngAfterViewInit() {
  vc.createEmbeddedView(templateRef);
}
```
4. Remove Embedded View
```typescript
remove() {
  this.vc.remove()
}
```

Can ng-template contain ng-content?

## Dynamic Components
1. Add component to entry components. This is so Angular compiler will generate factories for them.
```typescript
@NgModule({
  ...
  entryComponents: [SomeComponent]
})
```
2. Add and initialize a view container.
```html
<ng-container #vc></ng-container>
```
```typescript
// read: ViewContainerRef turns the DOM element into a view container.
@ViewChild('vc', {read: ViewContainerRef}) vc;
```
3. Get the component factory using ComponentFactoryResolver.
```typescript
export class SomeComponent {
  
  const factory = this.resolver.resolveComponentFactory(SomeComponent);

  constructor(private resolver: ComponentFactoryResolver) {

  }
}
```
4. Use createComponent method of a view container to render a dynamic comonent.
```typescript
vc.createComponent(componentFactory);
```
