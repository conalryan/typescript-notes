# ViewContainerRef
  
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
