# NgConf Content Projection

https://www.youtube.com/watch?v=PTwKhxLZ3jI
https://stackblitz.com/edit/ng-conf-2018-content-projection

## Targeted Projection

- ng-content can take select attribute.
- Pass in any valid css selector.

```html
<div class="fence">
  <!-- Only my-sheep components will be inside the fence -->
  <ng-content select="my-sheep"></ng-content>
</div>
<!-- Catch all for any other elements -->
<ng-content></ng-content>
```

Example use:

```html
<my-pasture>
  <my-sheep></my-sheep>
  <my-sheep></my-sheep>
  <my-elephant></my-elephant>
  <my-sheep></my-sheep>
</my-pasture>
```

## [NgContainer](https://angular.io/guide/structural-directives#ng-container-to-the-rescue)

- Transparent, it doesn't change the output.
- You can put as many ng-containers as you want.

## NgProjectAs

- Attribute selector to place on ng-container to specify the type of the projected content.
- Any valid css selector can be used.
- Can be placed on any element you want, and that element will be projected as the given element (e.g. `<h1 ngProjectAs="my-sheep">Hi</h1>`)
```html
<my-pasture>
  <ng-container ngProjectAs="my-sheep">
    <my-sheep></my-sheep>
  </ng-container>
  <my-elephant></my-elephant>
</my-pasture>
```

## NgContent

- Runs at build time. You figure out what goes where and render it that way, rather then searching at run time to move components into place.
- Does not produce content, it simply moves existing one.
- Similar to `javascript parent.appendChild(el);`
- In other words Angular protects the component based on where it was declared, not where it's used.
- Aka a thrid-party component cannot control the lifecycle of your component, only you can by where you declare it.
- Lifecylce of sheep component depends on where it is declared, not where it ends up being dispalyed in the html.
- Perform plaement at build time as opposed to building it and moving it into place at runtime.

## TemplateRef

- Blueprints in Angular
- Wrap content in <ng-template>, now you can use that blueprint anywhere you want, as many times as you want. 

```html
<ng-template>
  <my-sheep></my-sheep>
</ng-template>
```

- Structural directive \*someDirective is syntactic sugar for an ng-template

  ```html
  <my-shepp *myDirective></my-sheep>
  <!-- Above line is same as: -->
  <ng-template myDirective>
    <my-sheep></my-sheep>
  </ng-template>
  ```

## Custom Directive

- Rather than write template-refs all the time and then query for them, you can create your own directive to get ahold of the ng-template.
- Angular will pass templateRef in constructor.
- Angular will pass parent component into directives constructor.
- Pass template ref to parent component by binding.

```typescript
import { Directive, TemplateRef } from "@angular/core";

import { FarmComponent } from "./farm";

@Directive({
  selector: "[mySheepBlueprint]"
})
export class SheepBlueprintDirective {
  /**
   * Angular will pass TemplateRef into constructor.
   * Angular will pass parent component into constructor.
   */
  constructor(templateRef: TemplateRef<void>, farm: FarmComponent) {
    // Bind template ref to parent component property.
    farm.sheepTemplate = templateRef;
  }
}
```

- Example use:
  farm.component.html (aka parent)
  ```html
  <div class="fence">
    <ng-container [ngTemplateOutlet]="sheepTemplate"></ng-container>
    <ng-container [ngTemplateOutlet]="sheepTemplate"></ng-container>
    <ng-container [ngTemplateOutlet]="sheepTemplate"></ng-container>
  </div>
  ```
  app.component.html
  ```html
  <my-farm>
    <my-sheep *mySheepBlueprint></my-sheep>
  </my-farm>
  ```

## NgFor

- Offers a template option

```html
<div class="fence">
  <ng-content *ngFor="let sheep of flock; template: sheepTemplate"></ng-content>
</div>
```

## Lifecylce Issues

- ng-content happens at build time, which means the component will be placed in one ng-content at build time and it won't be moved.

```html
<div class="barn">
  <ng-content *ngIf="!day"></ng-content>
</div>

<div class="outside">
  <ng-content *ngIf="day"></ng-content>
</div>
```

```html
<div class="barn">
  <ng-container *ngIf="!day"
    [ngTemplateOutlet]="sheep">
  </ng-container>
</div>

<div class="outside">
  <ng-container *ngIf="day"
    [ngTemplateOutlet]="sheep">
  </ng-container>
</div>

<ng-template #sheep>
  <ng-content></ng-content>
</ng-template>
```

## Summary

- If you only need one and only one child projected

```html
<my-third-party-component>
  <my-sheep></my-sheep>
</my-third-party-component>
```

- If you want multipled children, or a new child created every time

```html
<my-third-party-component>
  <my-sheep *mySheepBlueprint></my-sheep>
</my-third-party-component>
```
