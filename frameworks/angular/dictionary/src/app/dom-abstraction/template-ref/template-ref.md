# TemplateRef
https://blog.angularindepth.com/exploring-angular-dom-abstractions-80b3ebcfc02

```typescript
export declare abstract class TemplateRef<C> {
  readonly abstract elementRef: ElementRef;
  abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;
}
```

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
- Available in **ngOnInit()** hook.
