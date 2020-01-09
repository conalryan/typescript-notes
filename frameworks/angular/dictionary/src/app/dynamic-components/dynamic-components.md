# Dynamic Components

https://blog.angularindepth.com/here-is-what-you-need-to-know-about-dynamic-components-in-angular-ac1e96167f9e

- Static templates
- Factories
- Factory resolver.

## Compiler
- Generates component factories from data in @Component decorator.
- It’s a job of a compiler to resolve all the required dependencies and provide them at the runtime.
- Angular has only one compiler and it is referred to as JIT or AOT depending on when it is used.
  - JIT:
    - Compiled during runtime.
  - AOT:
    - Compiled before code is executed in browser.
    - Preferred method since you can get smaller bundle sizes and optimizations for speed.

## Component factory
- Every component is created from a factory.
- If you have access to a factory you can easily create a component instance from it and insert into a DOM using **viewContainerRef**.
- When Angular compiles an application, it takes components that are defined in entryComponents of a module or found in components templates and generates component factories for them. You can see those factories in the Sources tab:

## Component Factory Resolver
- Each module provides a ComponentFactoryResolver service for all its components to get a component factory.
- Component that is passed to resolveComponentFactory must be added to entryComponents, else the componentFactory is not available for that component.

````typescript
export class AppComponent {
  constructor(private resolver: ComponentFactoryResolver) {
    // bFactory contains a reference to the cmp factory
    const bFactory = this.resolver.resolveComponentFactory(BComponent);
  }
}
````

- This only works if both components are defined in the same module or if a module with a resolved component factory is imported.

## Entry Components
- Components that are defined in entryComponents of a module or found in components templates and generates component factories for them.
- You can see those factories in the Sources tab.

## View
- Angular is a tree of views.
- Each view is composed of different types of nodes

## Nodes
- Each view is composed of different types of nodes:
  - element nodes
  - text nodes
  - etc.
- Each node is narrowly specialized in its purpose so that processing of such nodes takes as little time as possible.
- There are various providers associated with each node — like **ViewContainerRef** and **TemplateRef**.
- And each node knows how to respond to queries like **ViewChildren** and **ContentChildren**.
- That’s a lot of information for each node.
- Optimize for speed all this information has to be available when the node is constructed and cannot be changed later.
- This is what compilation process does — collects all the required information and encapsulates it in the form of a component factory.
 
## Providers
- There are various providers associated with each node — like **ViewContainerRef** and **TemplateRef**.
- And each node knows how to respond to queries like **ViewChildren** and **ContentChildren**.

## Modules
- Components don’t exist by themselves and if you want to use a component from a different module you have to import that module:
- **exports**
  - Provide components to be used by other modules.
- Each component is bound to a particular module and you can’t declare the same component in different modules.

If you do that you’ll get an error:

````typescript
Type X is part of the declarations of 2 modules: ...
````
  
Here is how CommonModule does that:
````typescript
const COMMON_DIRECTIVES: Provider[] = [
  NgClass,
  NgComponentOutlet,
  NgForOf,
  NgIf,
  ...
];

@NgModule({
  declarations: [COMMON_DIRECTIVES, ...],
  exports: [COMMON_DIRECTIVES, ...],
  ...
})
export class CommonModule {
}
````  
 
## Creating components on the fly
- The general flow to create and attach a dynamic content to the view is the following:
  1. Define a component class and its properties and decorate the class
  2. Define a module class, add the component to module declarations and decorate the module class
  3. Compile module and all components to get hold of a component factory
- The module is simply a class with a decorator applied to it. 
- The component is simply a class with a decorator applied to it.
- Decorators are simple functions and available during runtime that can be applied to any class.

Here is the how to create and attach component dynamically on the fly:
````typescript
@Component({
  selector: 'app-dynamic',
  template: `
    <p>
      dynamic works!
    </p>
    <ng-container #vc></ng-container>
  `,
  styles: []
})
export class DynamicComponent implements AfterViewInit {

  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;

  constructor(private _compiler: Compiler,
              private _injector: Injector,
              private _m: NgModuleRef<any>) {
  }

  ngAfterViewInit() {
    const template = '<span>I am {{name}}</span>';

    const tmpCmp = Component({template: template})(class {
    });
    const tmpModule = NgModule({declarations: [tmpCmp]})(class {
    });

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        const cmpRef = f.create(this._injector, [], null, this._m);
        cmpRef.instance.name = 'B component';
        this.vc.insert(cmpRef.hostView);
      });
  }
}
````

