# @ViewChild
- Access view abstractions in a component/directive with DOM queries.
- @ViewChildren returns multiple references as a QueryList object.
- Usually these decorators work in pair with template reference variables.
- Updated after the view has been checked
- View queries are set before the **ngAfterViewInit** callback is called.

## Template Reference Variable
- Named reference to a DOM element within a template.
- Similar to id attribute of an html element.
- Mark a DOM element with a template reference and then query it inside a class using ViewChild decorator.
````html
<span #myTemplateRef>I am span</span>
````
ElementRef
````typescript
@ViewChild('myElementRef', {read: ElementRef}) elmRef: ElementRef;
````
TemplateRef
````typescript
@ViewChild('ngTemplateRef') ngTplRef: TemplateRef<any>;
````
Query
````typescript
// Query for a VIEW child of type `ChildViewComponent`
@ViewChild(ChildViewComponent) viewChild: ChildViewComponent;
````
