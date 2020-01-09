# [Directive](https://angular.io/api/core/Directive)

## Structural
- Modifies DOM by adding, removing, replacing DOM elements.
- Examples: *ngIf, *ngFor, *ngSwitch

## Attributes
- Modifies behavior and/or appearance of an existing element.
- Examples: ngStyle, ngClass, ngModel 

https://www.sitepoint.com/practical-guide-angular-directives/

- You can define your own directives to attach custom behavior to elements in the DOM.
- Directives have all the features of components except that they do not have a view (i.e. a template and some HTML that is injected into the DOM).
- Multiple directive can be associated with an element. However only a single component can be associated with it.
- Angular has been built from the ground up to work in a number of different environments, including server side via node and on a native mobile device. So the Angular team has provided a platform independent way of setting properties on our elements via something called a Renderer.

## Namespace
- The Angular team recommends using directives as attributes, prefixed with a namespace (e.g. myCustomDirective, acmeCustomDirective, etc.)

## selector
- The CSS selector that identifies this directive in a template and triggers instantiation of the directive.
- Declare as one of the following:
  - element-name: Select by element name (can be a custom element or standard element)
  ````typescript
  @Directive({
    selector:"p"
  })
  ````
  ````html
  <p>...</p>
  ````
  ````typescript
  @Directive({
    selector:"my-custom-directive"
  })
  ````
  ````html
  <my-custom-directive">...</my-custom-directive>
  ````
  - .class: Select by class name.
  ````typescript
  @Directive({
    selector:".myCustomDirective"
  })
  ````
  ````html
  <div class="myCustomDirective">...</div>
  ````
  - [attribute]: Select by attribute name.
  ````typescript
  @Directive({
    selector:"[myCustomDirective]"
  })
  ````
  ````html
  <div [myCustomDirective]>...</div>
  ````
  - [attribute=value]: Select by attribute name and value.
  ````typescript
    @Directive({
      selector:"input[type=text]"
    })
    ````
    ````html
    <input type="text">
    ````
  - :not(sub_selector): Select only if the element does not match the sub_selector.
  - selector1, selector2: Select if either selector1 or selector2 matches.

## inputs
- Enumerates the set of data-bound input properties for a directive

## outputs
- The set of event-bound output properties. When an output property emits an event, an event handler attached to that event in the template is invoked.

## providers
- Configures the injector of this directive or component with a token that maps to a provider of a dependency.

## exportAs
- The name or names that can be used in the template to assign this directive to a variable. For multiple names, use a comma-separated string.

## queries
- Configures the queries that will be injected into the directive.
- Content queries are set before the ngAfterContentInit callback is called. 
- View queries are set before the ngAfterViewInit callback is called

## jit
- If true, this directive/component will be skipped by the AOT compiler and so will always be compiled using JIT.
- This exists to support future Ivy work and has no effect currently.

## host
- Maps class properties to host element bindings for properties, attributes, and events, using a set of key-value pairs.
- Angular automatically checks host property bindings during change detection.
- If a binding changes, Angular updates the directive's host element.
- When the key is a property of the host element, the property value is the propagated to the specified DOM property.
- When the key is a static attribute in the DOM, the attribute value is propagated to the specified property in the host element.
- For event handling:
  - The key is the DOM event that the directive listens to. 
  - To listen to global events, add the target to the event name: 
    - The target can be window, document or body.
  - The value is the statement to execute when the event occurs.
  - If the statement evalueates to false, then preventDefault is applied on the DOM event. 
  - A handler method can refer to the $event local variable.
