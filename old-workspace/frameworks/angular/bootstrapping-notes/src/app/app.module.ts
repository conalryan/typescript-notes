import { BrowserModule } from '@angular/platform-browser';
import {ApplicationRef, NgModule} from '@angular/core';


import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import {Type} from "@angular/core/src/type";


@NgModule({
  declarations: [
    AppComponent,
    AComponent,
    BComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  /**
   * Defines the components that should be bootstrapped when
   * this module is bootstrapped. The components listed here
   * will automatically be added to `entryComponents`.
   * bootstrap?: Array<Type<any> | any[]>;
   *
   * Tell Angular which component to bootstrap app with.
   * Angular automatically adds all components specified in the bootstrap property to entry components,
   * that is why you usually don’t add the root component to the entryComponents.
   */
  // bootstrap: [AppComponent],
  /**
   * Specifies a list of components that should be compiled when this module is defined.
   * For each component listed here, Angular will create a {@link ComponentFactory}
   * and store it in the {@link ComponentFactoryResolver}.
   * entryComponents?: Array<Type<any> | any[]>;
   *
   * Don’t register them in the bootstrap property since we will be bootstrapping them manually.
   * Compiler will create factories for components listed in entryComponents array.
   *
   * Note: 'app-a' and 'app-b' do not appear in the index html, since they will be added dynamically.
   */
  entryComponents: [AComponent, BComponent]
})
export class AppModule {

  /**
   * Angular passes the reference to the running application in the ApplicationRef arg to this method.
   * Use bootstrap method of the ApplicationRef to initialize the root component.
   *
   * If you don't specify this method:
   * ERROR Error: The module AppModule was bootstrapped, but it does not declare "@NgModule.bootstrap" components nor a "ngDoBootstrap" method. Please define one of these.
   *
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
