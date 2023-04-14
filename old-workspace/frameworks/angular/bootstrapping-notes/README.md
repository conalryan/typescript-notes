# AngularBootstrappingNotes

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.5.2.

Setup
==================================================================================================

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding
Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

### Build
Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests
Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests
Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

### Generate App with Angular-CLI
```bash
ng new angular-bootstrapping-notes --style scss
```

### Git Setup
- Remove Angular CLI .git
```bash
ls -a
rm -rf .git
```
- Initialize new Git Repo
```bash
git init
```
-  Initial comit
```bash
git add .
git commit -m "ng new angular-bootstrapping-notes --style scss"
git remote add origin https://github.com/conalryan/angular-bootstrapping-notes.git
git push -u origin master
```

### Error: Cannot find module '@angular-devkit/core'
Fix:
  "@angular/cli": "1.6.0", -> "@angular/cli": "^1.6.0", in package.json
  Ref: https://github.com/angular/angular-cli/issues/9307

### Manually Bootstrap Angular 
https://blog.angularindepth.com/how-to-manually-bootstrap-an-angular-application-9a36ccf86429

### Example
https://stackblitz.com/edit/angular-h312t4?file=app%2Fapp.module.ts

Implementation
==================================================================================================
## main.ts
````typescript
// main.ts
platformBrowserDynamic().bootstrapModule(AppModule);
````
## PlatformRef:
https://angular.io/api/core/PlatformRef
- The first part of the statement **platformBrowserDynamic()** creates a platform.
- The entry point for Angular on a web page.
- Each page has exactly one platform, and services (such as reflection) which are common to every Angular application running on the page are bound in its scope.
- A page's platform is initialized implicitly when a platform is created via a platform factory (e.g. platformBrowser), or explicitly by calling the createPlatform function.
 
## Application Instance
https://angular.io/api/core/ApplicationRef
- Application that is running on the platform.
- Many applications can be run on one platform.
- Each application is created from the module using **bootstrapModule** method.
- This is exactly the method that is used in main.ts. 
- So the statement shown in the docs first creates a platform and then the application instance.
- Inject using **ApplicationRef** token.

## Bootstrap Module
- Angular will check for the **bootstrap** meta-config property on the bootstrapped module:
````typescript
@NgModule({
  imports: [BrowserModule],
  declarations: [AppComponent],
  bootstrap: [AppComponent]
})
export class AppModule {}
````

- **bootstrap** property references the component you want to bootstrap the application with.
````typescript
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';
}
````
- Angular automatically adds all components specified in the bootstrap property to entry components, that is why you usually don’t add the root component to the entryComponents.
- Angular finds the element that is the selector of bootstrapped component in the DOM and initializes the component.
````html
<body>
  <app-root></app-root>
</body>
````

Questions
--------------------------------------------------------------------------------------------------
* What is main.ts used for?
  - Used to bootstrap the app.

* What does bootstrap mean?
  - Start your application.

* What does platformBrowserDynamic() do?
  - Creates a platform.

* What is a platform?
  - The entry point for Angular on a web page.

* How many platforms does a page have?
  - Each page has exactly one platform.

* How do you create a platform?
  - Initialized implicitly when a platform is created via a platform factory (e.g. **platformBrowser**)
  - Initialized explicitly by calling the **createPlatform** function.
  
* What is ApplicationRef?
  - It's the application instance.
  - It's an injectable token.
  
* How do you create an application instance?
  - Each application instance is created from the **bootstrapModule** method.
  
* Can any module be passed to bootstrapModule method?
  - Yes as along as it has a bootstrap property in it's meta-config.
  - Angular will check for the bootstrap property in the meta-config annotation.

* What is the **bootstrap** property in **NgModule**?
  - It's the component you want instantiated on load.
  - bootstrap is automatically added to **entyComponents** so you don't need to define it there.

* How many application instance can be run on a platform?
  - Many.
  
* Can any component be used in bootstrap property?
  - Yup.

* What do you add to index.html?
  - The component selector that is specified in the module that is passed to bootstrapModule method (e.g. <app-root></app-root>).

Manual Bootstrap
==================================================================================================
What if you don't know which module you should load until runtime?

## entryComponents
- Add the components that you may want to bootstrap to the **entryComponents** property.
````typescript
@NgModule({
  imports: [BrowserModule],
  declarations: [AComponent, BComponent],
  entryComponents: [AComponent, BComponent]
})
export class AppModule { }
````
- The compiler will create factories for all the components registered in entryComponets.
- Angular automatically adds all components specified in the bootstrap property to entry components that is why you usually don’t add the root component to the entryComponents.

## ngDoBootstrap
- Angular passes the reference to the running application in the form of ApplicationRef to this method.
- Later, when we will be ready to bootstrap the application we will use bootstrap method of the ApplicationRef to initialize the root component.
````typescript
@NgModule({
  imports: [BrowserModule],
  declarations: [AComponent, BComponent],
  entryComponents: [AComponent, BComponent]
})
export class AppModule {
  /**
   * Angular passes the reference to the running application in the ApplicationRef arg to this method.
   * Use bootstrap method of the ApplicationRef to initialize the root component.
   * @param applicationRef
   */
  ngDoBootstrap(applicationRef: ApplicationRef) {
    applicationRef.bootstrap(someComponent);
  }
}
````

## Custom function
- Create a custom function to return the selector name of the component you want to manually bootstrap.
- Create a DOM element for the selector and append it to index.html
- Call bootstrap method on the applcationRef passing in the component you want to bootstrap.
````typescript
export class AppModule {

  /**
   * Angular passes the reference to the running application in the ApplicationRef arg to this method.
   * Use bootstrap method of the ApplicationRef to initialize the root component.
   * @param applicationRef
   */
  ngDoBootstrap(applicationRef: ApplicationRef) {
    this._pseudoFetch()
      .then((componentSelector: string) => { this._bootstrapRootComponent(applicationRef, componentSelector); });
  }

  /**
   * Dynamically create an Element and append to body.
   * Call bootstrap on applicationRef passing in given component that corresponds ot selector arg.
   *
   * Does it work with AOT?
   * - Yes. You just have to precompile all your components and use the factories when bootstrapping the application:
   *   'app-a': AComponentNgFactory,
   *   'app-b': BComponentNgFactory
   * - Note: We don’t need to specify components in the entryComponents since we already have the factories and don’t need to compile them.
   *
   * @param {ApplicationRef} applicationRef - reference to the running application (ApplicationRef)
   * @param {string} componentSelector - string name (selector) of the component to bootstrap
   * @private
   */
  private _bootstrapRootComponent(applicationRef: ApplicationRef, componentSelector: string) {

    // define the possible bootstrap components
    // with their selectors (html host elements)
    const options = {
      'app-a': AComponent,
      'app-b': BComponent
    };

    // obtain reference to the DOM element that shows status and change the status to `Loaded`
    const statusElement = document.querySelector('#status');
    statusElement.textContent = 'Loaded';

    // create DOM element for the component being bootstrapped and add it to the DOM
    const componentElement = document.createElement(componentSelector);
    document.body.appendChild(componentElement);

    // bootstrap the application with the selected component
    const component = options[componentSelector];
    applicationRef.bootstrap(component);
  }

  /**
   * Simulate an HTTP call to dynamically obtain component to bootstrap.
   *
   * @returns {Promise<any>}
   * @private
   */
  private _pseudoFetch() {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('app-b');
      }, 2000);
    });
  }
}
````

## index.html
- Unlike the normal flow, we can't specify the bootstrap component in index.html since we don't know which one to use.
````html
<body>
  <h1 id="status">
     Loading dynamic component here ...
  </h1>
</body>
````
Questions
--------------------------------------------------------------------------------------------------
* What is entryComponents used for?
  - Used to register components that you want the compiler to create a facotry for.

* What is ngDoBootstrap?
  - A method used to dynamically bootstrap a component.
  - Note: To bootstrap you either need a bootstrap property on the module or a ngDoBootstrap method.

* How do you manually bootstrap a component?
  - Obtain a reference to applicationRef then call bootstrap method, passing in the component you want to bootstap.
  - Note: you'll need to create a DOM element for the selector and append it in index.html.

* How does index.html differ with manual bootstrap?
  - There is no component selector defined in the index.html.
  - You'll need to dynamically add it with document.createElement and document.body.appendChild

AOT
--------------------------------------------------------------------------------------------------
- You have to precompile all your components and use the factories when bootstrapping the application:
````typescript
import {AComponentNgFactory, BComponentNgFactory} from './components.ngfactory.ts';

@NgModule({
  imports: [BrowserModule],
  declarations: [AComponent, BComponent]
})
export class AppModule {

  ngDoBootstrap(applicationRef: ApplicationRef) {
    this._pseudoFetch()
      .then((componentSelector: string) => { this._bootstrapRootComponent(applicationRef, componentSelector); });
  }

  
  private _bootstrapRootComponent(applicationRef: ApplicationRef, componentSelector: string) {

    // Use ComponentNgFactory rather than the component.
    const options = {
      'app-a': AComponentNgFactory,
      'app-b': BComponentNgFactory
    };
    
    ...
  }
}
````
- Note that we don’t need to specify components in the entryComponents since we already have the factories and don’t need to compile them.

