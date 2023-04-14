# Extension Mechanism Demo
https://www.youtube.com/watch?v=pERhnBBae2k
https://github.com/maximusk/extension-mechanism-demo

- No dyanmic components encapsulation.
- No modules hierarchy.
- Eager is the same as lazy.

## Router Implementation
```typescript
export const ROUTES = new InjectionToken<Route[][]>('ROUTES');

export class RouterConfigLoader {
  load() {
    // Lazy loads a module class.
    const moduleClass = this.loader.load(path);
    // Compiles module class and gets a module factory.
    const moduleFactory = this.compiler.compileModuleAsync(moduleClass);
    // Factory creates a module instance.
    const module = factory.create(parentInjection);
    // Factory create an injector.
    // Router uses this injector to get the routes.
    // moduleRef.injector -> Injector instance
    const routes = module.injector.get(ROUTES);
  }
}
```

### Module Factory
- Module class -> NgModuleCompiler -> Module Factory.
```typescript
class A {}
class B { constructor(a: A) {} }

@NgModule({
  providers: [ A, B ]
})
class SomeModule {}
```
||
\/
```typescript
providerDefinitions: [
  { token: A, value: A, deps: [] },
  {
    token: B, value: B,
    deps: [ { token: A } ]
  }
]
```
  
### Modules to Injectors
- Module class -> compiler (JIT, or AOT) -> Module factory -> runtime -> NgModulRef && Injector.

### Imported Modules & Factories
- Module A {providers: pA}
- Module B {providers: pB}
- App Module {imports: module A, module B}
||
\/
- App Module Factory
  - providerDefinitions:
    - A module
    - B module
    - App module
    - pA
    - pB

### Providing Widgets
```typescript
export class RouterModule {
  // ...
  static forChild(routes: Routes): ModuleWithProviders {
    return {
      ngModule: RouterModule,
      providers: [
        {
          provide: ROUTES,
          useValue: routes,
          multi: true
        }
      ]
    }
  }
}
```
```typescript
@NgModule({
  declartaions: [ComponentA1],
  entryComponents: [ComponentA1],
  providers: [
    {
      provide: 'widgests',
      useValue: [
        {
          name: 'component-a1',
          component: ComponentA1
        }
      ],
      multi: true
    }
  ]
})
export class ModuleA {}
```
