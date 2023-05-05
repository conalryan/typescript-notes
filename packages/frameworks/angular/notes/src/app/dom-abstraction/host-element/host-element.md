# Host Element

- All components are hosted inside a custom DOM element and all directives are applied to DOM elements.
- Component and directive classes can obtain an instance of ElementRef associated with their host element through DI mechanism.

```typescript
constructor(private hostElement: ElementRef) {
  // outputs <app-host-element>...</app-host-element>
  console.log(this.hostElement.nativeElement.outerHTML)
}
```
