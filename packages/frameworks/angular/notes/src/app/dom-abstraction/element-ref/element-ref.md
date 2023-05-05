# ElementRef


````typescript
export declare class ElementRef {
  nativeElement: any;
  constructor(nativeElement: any);
}
````


- Most basic abstraction.
- **nativeElement**
  - Only holds the native element it’s associated with.
- It’s useful for accessing native DOM element:

````typescript
console.log(this.elmRef.nativeElement.textContent);
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

- ViewChild decorator is used most often to get a reference to a DOM element in their view (template).
- Directives have no views and they usually work directly with the element they are attached to.
- Available in **ngOnInit()** hook.
