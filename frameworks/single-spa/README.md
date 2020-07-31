Overview
-------------------------------------------------------------------------------

Common API 
- Bootstrap function for initialization 
- Mount function to activate the application 
- Unmount function to deactivate the application 

3 Steps to get started 
- `yarn add single-spa`
- `singleSpa.registerApplication(…);`
- `singleSpa.start();`

"Since JavaScript is notorious for the short-life of its many frameworks" 

Architecture Overview 
- Each application can respond to url routing events and must know how to bootstrap, mount, and unmount themselves from the DOM. 
- When active, they listen to url routing events and put content on the DOM. When inactive, they do not listen to url routing events and are totally removed from the DOM. 
- A single-spa-config, which is the html page and the JavaScript that registers applications with single-spa. Each application is registered with three things: 
    - A name 
    - A function to load the application's code 
    - A function that determines when the application is active/inactive 


What determines if a registered application is mounted is its activity function. Whenever a registered application is not mounted, it should remain completely dormant until mounted.


[Registered application lifecycle](https://single-spa.js.org/docs/building-applications#registered-application-lifecycle)
- Implementing `bootstrap`, `mount`, and `unmount` is required. But implementing `unload` is optional.
- Each lifecycle function must either return a `Promise` or be an `async function`.
- If an array of functions is exported (instead of just one function), the functions will be called one-after-the-other, waiting for the resolution of one function's promise before calling the next.
- If single-spa is not started, applications will be loaded, but will not be bootstrapped, mounted or unmounted.

[Lifecycle props](https://single-spa.js.org/docs/building-applications#lifecyle-props)
```javascript
function bootstrap(props) {
  const {
    name,        // The name of the application
    singleSpa,   // The singleSpa instance
    mountParcel, // Function for manually mounting
    customProps  // Additional custom information
  } = props;     // Props are given to every lifecycle
  return Promise.resolve();
}
```
- `name`: The string name that was registered to single-spa.
- `singleSpa`: A reference to the singleSpa instance, itself. This is intended to allow applications and helper libraries to call singleSpa APIs without having to import it. This is useful in situations where there are multiple webpack configs that are not set up to ensure that only one instance of singleSpa is loaded.
- `mountParcel`: The mountParcel function.
Custom prop functions are called with the application name and current window.location as arguments.

```javascript
// root.application.js
singleSpa.registerApplication({
  name: 'app1',
  activeWhen,
  app,
  customProps: { authToken: "d83jD63UdZ6RS6f70D0" }
});
singleSpa.registerApplication({
  name: 'app1',
  activeWhen,
  app,
  customProps: (name, location) => {
    return { authToken: "d83jD63UdZ6RS6f70D0" };
  }
});
```

```javascript
// app1.js
export function mount(props) {
  console.log(props.authToken); // do something with the common authToken in app1
  return reactLifecycles.mount(props);
}
```
Some use cases could be to:
- share a common access token with all child apps
- pass down some initialization information, like the rendering target
- pass a reference to a common event bus so each app may talk to each other

Note that when no customProps are provided during registration, props.customProps defaults to an empty object.


[Load](https://single-spa.js.org/docs/building-applications#load)
It is best practice to do as little as possible / nothing at all during load, but instead to wait until the bootstrap lifecycle function to do anything. If you need to do something during load, simply put the code into a registered application's main entry point, but not inside of an exported function. For example:
```javascript
console.log("The registered application has been loaded!");
export async function bootstrap(props) {...}
export async function mount(props) {...}
export async function unmount(props) {...}
```

[Bootstrap](https://single-spa.js.org/docs/building-applications#bootstrap)
This lifecycle function will be called once, right before the registered application is mounted for the first time.
```javascript
export function bootstrap(props) {
  return Promise
    .resolve()
    .then(() => {
      // One-time initialization code goes here
      console.log('bootstrapped!')
    });
}
```

[Mount](https://single-spa.js.org/docs/building-applications#mount)
This lifecycle function will be called whenever the registered application is not mounted, but its activity function returns a truthy value. When called, this function should look at the URL to determine the active route and then create DOM elements, DOM event listeners, etc. to render content to the user. Any subsequent routing events (such as hashchange and popstate) will not trigger more calls to mount, but instead should be handled by the application itself.
```javascript
export function mount(props) {
  return Promise
    .resolve()
    .then(() => {
      // Do framework UI rendering here
      console.log('mounted!')
    });
}
```

[Unmount](https://single-spa.js.org/docs/building-applications#unmount)
This lifecycle function will be called whenever the registered application is mounted, but its activity function returns a falsy value. When called, this function should clean up all DOM elements, DOM event listeners, leaked memory, globals, observable subscriptions, etc. that were created at any point when the registered application was mounted.
```javascript
export function unmount(props) {
  return Promise
    .resolve()
    .then(() => {
      // Do framework UI unrendering here
      console.log('unmounted!');
    });
}
```

[Unload](https://single-spa.js.org/docs/building-applications#unload)
The unload lifecycle is an optionally implemented lifecycle function. It will be called whenever an application should be unloaded. This will not ever happen unless someone calls the unloadApplication API. If a registered application does not implement the unload lifecycle, then it assumed that unloading the app is a no-op.

The motivation for unload was to implement the hot-loading of entire registered applications, but it is useful in other scenarios as well when you want to re-bootstrap applications, but perform some logic before applications are re-bootstrapped.
```javascript
export function unload(props) {
  return Promise
    .resolve()
    .then(() => {
      // Hot-reloading implementation goes here
      console.log('unloaded!');
    });
}
```

[Dynamic Module Loading](https://single-spa.js.org/docs/separating-applications#option-3-dynamic-module-loading)
Create a root application which can allow single-spa applications to deploy themselves separately. To do so, create a manifest file that the single-spa applications update during their deployment process, which controls which versions of the single-spa applications are "live". Then change which javascript file is loaded based on the manifest.

Changing which javascript file is loaded for each child application can be done in many ways.
- Web server: have your webserver create a dynamic script tag for the "live" version of each single-spa application.
- Use a module loader such as SystemJS that can download and execute javascript code in the browser from dynamic urls.