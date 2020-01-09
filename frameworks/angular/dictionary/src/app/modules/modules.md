# Angular Modules

https://angular.io/guide/architecture-modules

## NgModule
- Angular's modularity system.
- NgModules are containers for a cohesive block of code dedicated to an application domain, a workflow, or a closely related set of capabilities.
- They can contain components, service providers, and other code files whose scope is defined by the containing NgModule.
- They can import functionality that is exported from other NgModules, and export selected functionality for use by other NgModules.
- Every Angular app has at least one NgModule class, the root module, which is conventionally named AppModule and resides in a file named app.module.ts.
- You launch your app by bootstrapping the root NgModule.

### Meta Data
- declarations: The components, directives, and pipes that belong to this NgModule.
- exports: The subset of declarations that should be visible and usable in the component templates of other NgModules.
- imports: Other modules whose exported classes are needed by component templates declared in this NgModule.
- providers: Creators of services that this NgModule contributes to the global collection of services; they become accessible in all parts of the app. (You can also specify providers at the component level, which is often preferred.)
- bootstrap: The main application view, called the root component, which hosts all other app views. Only the root NgModule should set the bootstrap property.

### NgModules and components
- NgModules provide a compilation context for their components.
- A root NgModule always has a root component that is created during bootstrap, but any NgModule can include any number of additional components, which can be loaded through the router or created through the template.
- The components that belong to an NgModule share a compilation context.

## View and View Hierarchy
- A component and its template together define a view. 
- A component can contain a view hierarchy, which allows you to define arbitrarily complex areas of the screen that can be created, modified, and destroyed as a unit. 
- view hierarchy can mix views defined in components that belong to different NgModules.
- This is often the case, especially for UI libraries.
- When you create a component, it's associated directly with a single view, called the host view. 
- The host view can be the root of a view hierarchy, which can contain embedded views, which are in turn the host views of other components.
- Those components can be in the same NgModule, or can be imported from other NgModules.
- Views in the tree can be nested to any depth.
- **Note:** The hierarchical structure of views is a key factor in the way Angular detects and responds to changes in the DOM and app data.

## NgModules and JavaScript modules
- The NgModule system is different from and unrelated to the JavaScript (ES2015) module system for managing collections of JavaScript objects.
- These are complementary module systems that you can use together to write your apps.
- JavaScript modules:
  - Each file is a module and all objects defined in the file belong to that module.
  - The module declares some objects to be public by marking them with the export key word.
  - Other JavaScript modules use import statements to access public objects from other modules.

## Angular Libraries
- Angular loads as a collection of JavaScript modules.
- You can think of them as library modules.
- Each Angular library name begins with the @angular prefix.

## NgModules
https://angular.io/guide/ngmodules
- NgModules configure the injector and the compiler and help organize related things together.
- Modules can also add services to the application.
- Such services might be internally developed, like something you'd develop yourself or come from outside sources, such as the Angular router and HTTP client.
- Modules can be loaded eagerly when the application starts or lazy loaded asynchronously by the router.
- NgModule metadata does the following:
  - Declares which components, directives, and pipes belong to the module.
  - Makes some of those components, directives, and pipes public so that other module's component templates can use them.
  - Imports other modules with the components, directives, and pipes that components in the current module need.
  - Provides services that the other application components can use.
  - Every Angular app has at least one module, the root module. You bootstrap that module to launch the application.

````typescript
/* These are JavaScript import statements. Angular doesn’t know anything about these. */
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
 
import { AppComponent } from './app.component';
 
/* The @NgModule decorator lets Angular know that this is an NgModule. */
@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [     /* These are NgModule imports. */
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
````
- The NgModule classes differ from JavaScript module in the following key ways:
  - An NgModule bounds declarable classes only. 
  - Declarables are the only classes that matter to the Angular compiler.
  - Instead of defining all member classes in one giant file as in a JavaScript module, you list the module's classes in the @NgModule.declarations list.
  - An NgModule can only export the declarable classes it owns or imports from other modules.
  - It doesn't declare or export any other kind of class.
  - Unlike JavaScript modules, an NgModule can extend the entire application with services by adding providers to the @NgModule.providers list.

### bootstrap array
- The application launches by bootstrapping the root AppModule, which is also referred to as an entryComponent.
- Among other things, the bootstrapping process creates the component(s) listed in the bootstrap array and inserts each one into the browser DOM.
- Each bootstrapped component is the base of its own tree of components.
- Inserting a bootstrapped component usually triggers a cascade of component creations that fill out that tree.
- **While you can put more than one component tree on a host web page, most applications have only one component tree and bootstrap a single root component.**
-> Is there an example of putting more than one component tree on a host we page? What does it look like? How does it work?
- This one root component is usually called AppComponent and is in the root module's bootstrap array.

## Angular Modularity
- Modules are a great way to organize an application and extend it with capabilities from external libraries.
- Angular libraries are NgModules, such as FormsModule, HttpClientModule, and RouterModule. Many third-party libraries are available as NgModules such as Material Design, Ionic, and AngularFire2.
- NgModules consolidate components, directives, and pipes into cohesive blocks of functionality, each focused on a feature area, application business domain, workflow, or common collection of utilities.

## Feature Modules
- There are five general categories of feature modules which tend to fall into the following groups:
  1. Domain feature modules.
  2. Routed feature modules.
  3. Routing modules.
  4. Service feature modules.
  5. Widget feature modules.

### Feature Module Guidelines
- Domain Feature Modules:
  - Deliver a user experience dedicated to a particular application domain like editing a customer or placing an order.
  - They typically have a top component that acts as the feature root and private, supporting sub-components descend from it.
  - Consist mostly of declarations. Only the top component is exported.
  - Rarely have providers. When they do, the lifetime of the provided services should be the same as the lifetime of the module.
  - Typically imported exactly once by a larger feature module.
  - They might be imported by the root AppModule of a small application that lacks routing.
- Routed Feature Modules:
  - Domain feature modules whose top components are the targets of router navigation routes.
  - All lazy-loaded modules are routed feature modules by definition.
  - Don’t export anything because their components never appear in the template of an external component.
  - A lazy-loaded routed feature module should not be imported by any module.
  - Doing so would trigger an eager load, defeating the purpose of lazy loading.That means you won’t see them mentioned among the AppModule imports.
  - An eager loaded routed feature module must be imported by another module so that the compiler learns about its components.
  - Rarely have providers for reasons explained in Lazy Loading Feature Modules. When they do, the lifetime of the provided services should be the same as the lifetime of the module.
  - Don't provide application-wide singleton services in a routed feature module or in a module that the routed module imports.
- Routing Module:	
  - A routing module provides routing configuration for another module and separates routing concerns from its companion module.
  - A routing module typically does the following:
    - Defines routes.
    - Adds router configuration to the module's imports.
    - Adds guard and resolver service providers to the module's providers.
    - The name of the routing module should parallel the name of its companion module, using the suffix "Routing". For example, FooModule in foo.module.ts has a routing module named FooRoutingModule in foo-routing.module.ts. 
    - If the companion module is the root AppModule, the AppRoutingModule adds router configuration to its imports with RouterModule.forRoot(routes). All other routing modules are children that import RouterModule.forChild(routes).
    - A routing module re-exports the RouterModule as a convenience so that components of the companion module have access to router directives such as RouterLink and RouterOutlet.
    - A routing module does not have its own declarations. Components, directives, and pipes are the responsibility of the feature module, not the routing module.
    - A routing module should only be imported by its companion module.
- Service:	
  - Service modules provide utility services such as data access and messaging. Ideally, they consist entirely of providers and have no declarations. Angular's HttpClientModule is a good example of a service module.
  - The root AppModule is the only module that should import service modules.
- Widget	
  - A widget module makes components, directives, and pipes available to external modules.
  - Many third-party UI component libraries are widget modules.
  - A widget module should consist entirely of declarations, most of them exported.
  - A widget module should rarely have providers.
  - Import widget modules in any module whose component templates need the widgets.

|Feature Module | Declarations  | Providers     | Exports       | Imported by           |
| ------------- | ------------  | ------------- | ------------- | --------------------- |
| Domain        | Yes           | Rare          | Top component	| Feature, AppModule    |
| Routed	      | Yes	          | Rare          | No	          | None                  |
| Routing	      | No	          | Yes (Guards)  | RouterModule  | Feature (for routing) |
| Service	      | No	          | Yes	          | No	          | AppModule             |
| Widget	      | Yes           | Rare	        | Yes	          | Feature               |

## Lazy Loading
- Lazy loading syntax uses **loadChildren** followed by a string that is the relative path to the module, a hash mark or **#**, and the module’s class name.
- The feature module is like a connector between the AppRoutingModule and the feature routing module.
- The AppRoutingModule imports the feature module, CustomersModule, and CustomersModule in turn imports the CustomersRoutingModule.
````typescript
// app-routing.module.ts
const routes: Routes = [
  {
    path: 'customers',
    loadChildren: './customers/customers.module#CustomersModule'
  },
  {
    path: 'orders',
    loadChildren: './orders/orders.module#OrdersModule'
  },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
````

## Avoid Common Confusions with Modules in Angular
https://blog.angularindepth.com/avoiding-common-confusions-with-modules-in-angular-ada070e6891f
- Angular introduces the concept of module encapsulation in a way similar to ES modules. 
- It basically means that declarable types — components, directives and pipes — can only be used by components declared inside this module.
- Module must export members in order for another component, directive in a different module can use it.
````typescript
@NgModule({
   ...
   declarations: [
     PublicPipe, 
     PrivatePipe, 
     PublicDirective, 
     PrivateDirective
   ],
   exports: [PublicPipe, PublicDirective]
 })
 export class AModule {}
````
- Please note that there’s no encapsulation for components added to the entryComponents. 
- If you use dynamic views and dynamic components instantiation you can use components from the A module without adding them into exports array.
- Of course you will still need to import the A module.
- There is no encapsulation for providers. 
- A provider declared in any non-lazy loaded module can be accessed anywhere inside the application.

### Module Hierarchy
- There is no hierarchy.
- A module that imports other modules does NOT become the parent module for its imports. 
- All modules are merged during compilation phase. 
- There’s no hierarchical relationship between the module that is imported and the module that imports.

### NgModuleFactory
- Just as with components, Angular compiler generates a factory for the root module. 
- The root module is the one that you specify in the bootstrapModule method in the main.ts:
````typescript
platformBrowserDynamic().bootstrapModule(AppModule);
````
- The factory that Angular compiler generates uses createNgModuleFactory function which takes:
  - module class reference
  - bootstrap components
  - component factory resolver with entry components
  - definition factory with merged module providers 
- After the compilation you don’t have several modules, you have a single merged module. 
- And during the compilation the compiler can’t know where and how you will be using providers and dynamic components. 
- So it can’t control encapsulation. But when parsing a component template this information is available which enables private declarables — components, directives and pipes.


- The first rule is that the provider defined in the module that imports other module always wins. Let’s use our setup and define a provider on the root module:
````typescript
@NgModule({
  ...
  providers: [{provide: 'a', useValue: 'root'}],
})
export class AppModule {}
````
````typescript
moduleDef([
  ...
  moduleProvideDef(256, 'a', 'root', []),
  moduleProvideDef(256, 'b', 'b', []),
]);
````
- The second rule is that the provider from the last imported module overrides providers in the preceding modules expect for the importing module (follows from the first rule).
- Let’s again tweak our setup and define a provider on B module:
````typescript
@NgModule({
  ...
  providers: [{provide: 'a', useValue: 'b'}],
})
export class BModule {}
````
````typescript
@NgModule({
  imports: [AModule, BModule],
  ...
})
export class AppModule {}
````
````typescript
moduleDef([
  ...
  moduleProvideDef(256, 'a', 'b', []),
  moduleProvideDef(256, 'root', 'root', []),
]);
````
````typescript
@NgModule({
  imports: [BModule, AModule],
  ...
})
export class AppModule {}
````
````typescript
moduleDef([
  ...
  moduleProvideDef(256, 'a', 'a', []),
  moduleProvideDef(256, 'root', 'root', []),
]);
````

### Lazy Loaded Modules
- Angular creates a lazy-loaded module with its own injector, a child of the root injector.
- So a lazy-loaded module that imports that shared module makes its own copy of the service.
- So lazy loaded modules do create hierarchy but it’s the hierarchy of injectors, not modules. 
- All imported modules are still merged into one factory during compilation just the same as with non-lazy modules.
  
### forRoot and forChild
- Call forRoot only in the root application module, AppModule
- Angular also supports another way of registering a module with providers. 
- Instead of passing the module class reference you can pass an object that implements ModuleWithProviders interface:
````typescript
interface ModuleWithProviders { 
  ngModule: Type<any>
  providers?: Provider[] 
}
````
- Here is how we can use this approach for our example above:
````typescript
@NgModule({})
class A {}

const moduleWithProviders = {
  ngModule: A,
  providers: [AService]
};

@NgModule({
  imports: [moduleWithProviders]
})
export class B {}
````
- And instead of importing and using the object reference moduleWithProviders directly it is better to define a static method on a module class that returns that object. 
````typescript
@NgModule({})
class A {
  static forRoot() {
    return {ngModule: A, providers: [AService]};
  }
}

@NgModule({
  imports: [A.forRoot()]
})
export class B {}
````
- It will make sense however when we want to split our providers and define different set of providers depending on where our module will be imported into.
- For example, we want to provide global A service for non-lazy loaded module and B service for a lazy loaded module.
````typescript
@NgModule({})
class A {
  static forRoot() {
    return {ngModule: A, providers: [AService]};
  }
  static forChild() {
    return {ngModule: A, providers: [BService]};
  }
}

@NgModule({
  imports: [A.forRoot()]
})
export class NonLazyLoadedModule {}

@NgModule({
  imports: [A.forChild()]
})
export class LazyLoadedModule {}
````
- It makes no sense to implement a forRoot method for modules that only define providers for the entire application and don’t have a special subset for lazy-loaded modules.
- And it’s even more confusing to use these methods if an imported module doesn’t define any providers at all.
- Use forRoot/forChild convention only for shared modules with providers that are going to be imported into both eager and lazy module modules
- There’s one more thing related to forRoot and forChild methods. Since these are just simple methods you can pass any options or additional providers when calling them. A good example here is the RouterModule. It defines forRoot method that takes both additional providers and configuration:
````typescript  
  export class RouterModule {
    static forRoot(routes: Routes, config?: ExtraOptions)
````
- The routes you pass to the method are registered using ROUTES token:
````typescript  
static forRoot(routes: Routes, config?: ExtraOptions) {
  return {
    ngModule: RouterModule,
    providers: [
      {provide: ROUTES, multi: true, useValue: routes}
...
````
- And options that you pass as the second parameter are used to configure other providers:
````typescript
static forRoot(routes: Routes, config?: ExtraOptions) {
  return {
    ngModule: RouterModule,
    providers: [
      {
        provide: PreloadingStrategy,
        useExisting: config.preloadingStrategy ?
          config.preloadingStrategy :
          NoPreloading
      }
````
