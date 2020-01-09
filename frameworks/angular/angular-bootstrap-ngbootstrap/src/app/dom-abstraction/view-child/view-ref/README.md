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

