# ViewRef
- Abstraction that represents an angular View.
- View is a fundamental building block of the application UI. 
- Smallest grouping of elements which are created and destroyed together.
- Angular philosophy encourages developers to see UI as a composition of Views, not as a tree of standalone html tags.
- Angular supports two types of views:
  1. **Embedded Views**
  2. **Host Views**


## 1. Embedded Views
- Linked to a Template.
- Template holds a blueprint for a view. 
- A view can be instantiated from the template using **createEmbeddedView** method like this:
````typescript
// Creating embedded view
ngAfterViewInit() {
    let view = this.tpl.createEmbeddedView(null);
}
````

## 2. HostView
- Linked to a Component.
- Host views are created when a component is dynamically instantiated.
- A component can be created dynamically using **ComponentFactoryResolver**.
- Each component is bound to a particular instance of an **injector**.
- Pass the current injector instance when creating the component.
````typescript
constructor(private injector: Injector,
            private r: ComponentFactoryResolver) {
    let factory = this.r.resolveComponentFactory(ColorComponent);
    let componentRef = factory.create(injector);
    let view = componentRef.hostView;
}
````
- Don’t forget that components that are instantiated dynamically must be added to EntryComponents of a module or hosting component.

### ViewContainer
- Once a view is created it can be inserted into the DOM using ViewContainer.
 
