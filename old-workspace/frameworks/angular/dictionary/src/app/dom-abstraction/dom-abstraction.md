# DOM Abstraction

Manipulating Views
https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02


Dom Abstraction: ElementRef | TemplateRef | ViewRef | ComponentRef | ViewContainerRef
Dom Query: @ViewChild | @ViewChildern with template reference variablw

## AngularJS

- Manipulate the DOM required injecting DOM element into **link** function and you could query any node within component’s template, add or remove child nodes, modify styles etc.
- However, this approach had one major shortcoming — it was tightly bound to a browser platform.

## Angular

- Runs on different platforms:
  - Browser
  - Mobile platform
  - Inside a web worker
- DOM Abstractions:
  - Level of abstraction is required to stand between platform specific API and the framework interfaces.
  - Abstractions come in a form of the following reference types:
    - **ElementRef**
    - **TemplateRef**
    - **ViewRef**
    - **ComponentRef**
    - **ViewContainerRef**
- Dom Queries:
  - Mechanism to access DOM abstractions inside a component/directive class.
  - **@ViewChild**
  - **@ViewChildren**
  - **Template Reference Variable**

## @ViewChild and @ViewChildren

- Decorator
- DOM query
- @ViewChild returns one reference
- @ViewChildren returns multiple references as a **QueryList** object.
- Usually, these decorators work in pair with **template reference variables**.
- You can use ViewChild to get the first element or the directive matching the selector from the view DOM.
- If the view DOM changes, and a new child matches the selector, the property will be updated.
- View queries are set before the **ngAfterViewInit** callback is called.
- Syntax:
  - @ViewChild([reference from template], {read: [reference type]});
  - read paramerter is not always required, since angular can infer the reference type by the type of the DOM element.
- Example:
  - Html element like span, angular returns ElementRef.
  - Template element returns TemplateRef.
  - ViewContainerRef cannot be inferred and have to be asked for specifically in read parameter.
  - ViewRef cannot be returned from the DOM and have to be constructed manually.

## Template Reference Variable

- Simply a named reference to a DOM element within a template.
- You can view it as something similar to id attribute of an html element.
- You mark a DOM element with a template reference and then query it inside a class using **ViewChild** decorator.

````typescript
@Component({
  selector: 'sample',
  template: `
      <span #tref>I am span</span>
  `
})
export class SampleComponent implements AfterViewInit {

  @ViewChild("tref", {read: ElementRef}) tref: ElementRef;

  ngAfterViewInit(): void {
    // outputs `I am span`
    console.log(this.tref.nativeElement.textContent);
  }
}
````

## ElementRef

- Most basic abstraction.
- **nativeElement**
  - Only holds the native element it’s associated with.
- It’s useful for accessing native DOM element:

````typescript
// outputs `I am span`
console.log(this.tref.nativeElement.textContent);
````

- Usage is discouraged by Angular team.
- Poses security risk.
- Tightly coupling between your application and rendering layers which makes is difficult to run an app on multiple platforms
- ElementRef can be returned for any DOM element using **ViewChild** decorator.
- But since all components are hosted inside a custom DOM element and all directives are applied to DOM elements, component and directive classes can obtain an instance of ElementRef associated with their **host element** through DI mechanism:

````typescript
@Component({
  selector: 'sample',
  ...
export class SampleComponent{
  constructor(private hostElement: ElementRef) {
    //outputs <sample>...</sample>
    console.log(this.hostElement.nativeElement.outerHTML);
  }
}
````

- ViewChild decorator is used most often to get a reference to a DOM element in the component's own view (template).
- Directives have no views and they usually work directly with the element they are attached to.

## TemplateRef

- Group of DOM elements that are reused in views across the app.

````typescript
@Component({
  selector: 'sample',
  template: `
    <ng-template #tpl>
      <span>I am span in template</span>
    </ng-template>
  `
})
export class SampleComponent implements AfterViewInit {

  @ViewChild("tpl") tpl: TemplateRef<any>;

  ngAfterViewInit() {
    let elementRef = this.tpl.elementRef;
    // outputs `template bindings={}`
    console.log(elementRef.nativeElement.textContent);
  }
}
````

- The framework removes template element from the DOM and inserts a comment in its place.
- This is how it looks like when rendered:

````html
<sample>
  <!--template bindings={}-->
</sample>
````

- TemplateRef class is a simple class.
- **elementRef**
  - TemplateRef Holds a reference to its host element in elementRef property
- **createEmbeddedView**
  - Method to create a view and return a reference to it as ViewRef.

## ViewRef

- Represents an angular View.
- View is a fundamental building block of the application UI.
- It is the smallest grouping of elements which are created and destroyed together.
- Angular philosophy encourages developers to see UI as a composition of Views, not as a tree of standalone html tags.
- Angular supports two types of views:
  1. **Embedded Views** which are linked to a Template
  - A template simply holds a blueprint for a view.
  - A view can be instantiated from the template using **createEmbeddedView** method:

  ````typescript
  ngAfterViewInit() {
    let view = this.tpl.createEmbeddedView(null);
  }
  ````

  2. **Host Views** which are linked to a Component
  - Host views are created when a component is dynamically instantiated.
  - A component can be created dynamically using **ComponentFactoryResolver**:

  ````typescript
  constructor(private injector: Injector,
              private r: ComponentFactoryResolver) {
    let factory = this.r.resolveComponentFactory(ColorComponent);
    let componentRef: ComponentRef<C> = factory.create(injector);
    let view = componentRef.hostView;
  }
  ````

  - Each component is bound to a particular instance of an **injector**, so we’re passing the current injector instance when creating the component.
  - Components that are instantiated dynamically must be added to **EntryComponents** of a module or hosting component.
- Once a view is created it can be inserted into the DOM using **ViewContainer**.

## ViewContainerRef

- Represents a container where one or more views can be attached.
- Any DOM element can be used as a view container.
- Angular doesn’t insert views inside the element, but appends them after the element bound to ViewContainer.
- Similar to how router-outlet inserts components.
- **ng-container**:
  - Good candidate to mark a place where a ViewContainer should be created is ng-container element.
  - Rendered as a comment and so it doesn’t introduce redundant html elements into DOM.
  - Example of creating a ViewContainer at the specific place in a components template:

  ````typescript
  @Component({
    selector: 'sample',
    template: `
      <span>I am first span</span>
      <ng-container #vc></ng-container>
      <span>I am last span</span>
    `
  })
  export class SampleComponent implements AfterViewInit {

    @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;

    ngAfterViewInit(): void {
      // outputs `template bindings={}`
      console.log(this.vc.element.nativeElement.textContent);
    }
  }
  ````

- Provides a convenient API for manipulating the views:

````typescript
class ViewContainerRef {
  ...
  clear() : void
  insert(viewRef: ViewRef, index?: number) : ViewRef
  get(index: number) : ViewRef
  indexOf(viewRef: ViewRef) : number
  detach(index?: number) : ViewRef
  move(viewRef: ViewRef, currentIndex: number) : ViewRef
}
````

- We’ve seen earlier how two types of views can be manually created from a template and a component.
- Once we have a view manually created from a template or a component, we can insert it into a DOM using insert method.

````typescript
@Component({
  selector: 'sample',
  template: `
    <span>I am first span</span>
    <ng-container #vc></ng-container>
    <span>I am last span</span>
    <ng-template #tpl>
      <span>I am span in template</span>
    </ng-template>
  `
})
export class SampleComponent implements AfterViewInit {

  @ViewChild("vc", {read: ViewContainerRef}) vc: ViewContainerRef;
  @ViewChild("tpl") tpl: TemplateRef<any>;

  ngAfterViewInit() {
    let view = this.tpl.createEmbeddedView(null);
    this.vc.insert(view);
  }
}
````

- Resulting HTML

````html
<sample>
  <span>I am first span</span>
  <!--template bindings={}-->
  <span>I am span in template</span>

  <span>I am last span</span>
  <!--template bindings={}-->
</sample>
````

- **detach()**
  - To remove a view from the DOM, we can use detach method.

- **createEmbeddedView()** and **createComponent()**
  - ViewContainer also provides API to create a view automatically:

  ````typescript
  class ViewContainerRef {
    element: ElementRef
    length: number

    createComponent(componentFactory...): ComponentRef<C>
    createEmbeddedView(templateRef...): EmbeddedViewRef<C>
    ...
  }
  ````

  - These are simply convenient wrappers to what we’ve done manually above.
  - They create a view from a template or component and insert it at the specified location.

## ngTemplateOutlet

- Directive
- Shortcut for creating embedded view
- Marks a DOM element as a ViewContainer and inserts an embedded view created by a template in it without the need to explicitly doing this in component class.
- This means that the example above where we created a view and inserted it into #vc DOM element can be rewritten like this:

````typescript
@Component({
  selector: 'sample',
  template: `
    <span>I am first span</span>
    <ng-container [ngTemplateOutlet]="tpl"></ng-container>
    <span>I am last span</span>
    <ng-template #tpl>
      <span>I am span in template</span>
    </ng-template>
  `
})
export class SampleComponent {}
````

## ngComponentOutlet

- Directive
- Shortcut for creating host view

````typescript
<ng-container *ngComponentOutlet="ColorComponent"></ng-container>
````
