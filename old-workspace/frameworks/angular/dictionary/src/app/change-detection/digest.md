# Digest -> Change Detection
https://blog.angularindepth.com/angulars-digest-is-reborn-in-the-newer-version-of-angular-718a961ebd3e

- Every framework solves the problem of synchronization between a data model (JavaScript objects) and UI (Browser DOM).
- The biggest challenge in the implementation is to know when a data model changed.
- The process of checking for the changes is called change detection.

Implementations
--------------------------------------------------------------------------------------------------
- There are three principle ways to detect changes:
  1. Ask user to notify a framework.
  2. Force user to use a wrapper on properties.
  3. Detect changes automatically by comparison.

````typescript
// I want to update this property:
let person = {name: 'Angular'};
// How does framework know it has been udpated?
````
1. Ask a user to notify a framework:
````typescript
constructor() {
  let person = {name: 'Angular'};
  this.state = person;
 }
 ...
 // explicitly notifying React about the changes and specifying what is about to change
 this.setState({name: 'Changed'});
````

2. Force him to use a wrapper on properties so the framework can add setters:
````typescript
let app = new Vue({
    data: {
        name: 'Hello Vue!'
    }
});
// the setter is triggered so Vue knows what changed
app.name = 'Changed';
````

3. The other way is to save the previous value for the name property and compare it to the current:
````typescript
if (previousValue !== person.name) {
 // change detected, update DOM 
}
````

### Issue:
- When should the comparison be done?

### Solution:
- Run the check every time the code runs.
- Code runs as a result of an asynchronous event — so called Virtual Machine (VM) turn/tick.
- Run change detection check in the end of the turn.
- Angular.js uses digest at the end of the VM turn.
- Angular uses change detection at the end of the VM turn.

Definition
--------------------------------------------------------------------------------------------------
- Change detection:
 - Mechanism that walks the tree of components.
 - Checks each component for changes and updates DOM when a component property is changed.
- Digest:
  - Same as Change detection above.

AngualrJS $Digest() (Change Detection)
--------------------------------------------------------------------------------------------------
- Tremendously expensive.
- Changing anything in the application becomes an operation that triggers hundreds or thousands of functions looking for changes.
- Puts a hard limit on the size of the UI you can build in AngularJS while remaining performant.
- To make AngularJS performant you'd need to selectively use $scope.$digest() instead of $scope.$apply everywhere and embracing immutable objects.
- Triggered:
    - Every asynchronous event
    - $timeout
    - $http
    - $scope.$apply
    - $scope.$digest
    
### Implementation:
- Watcher and a listener.
- During digest angular.js walks this tree of watchers and calls listeners to update the DOM.
- Watcher:
  - Function that returns a value being watched. 
    - Most often these values are the properties on a data model.
    - Can also track component state on the scope, computed values, third-party components etc. 
    - If the returned value is different from the previous returned value, angular calls a listener.
  - Hierarchy that closely resembles the components tree.
  - Grouped using $scope.
  - Triggered in strict order:
    1. Parent components
    2. Child components 
  - A watcher listener can have various side effects:
    - Child updating properties on a parent component.
    - If parent listeners have already been processed, and a child listener updates parent properties, the changes will not be detected.
    - That’s why the digest loop has to run multiple times to get stable — to ensure that there are no more changes.
    - And the number of such runs are limited to 10.
    - This design decision is now considered flawed and Angular doesn’t allow that.
- Listener:
  - Usually used to update the UI.
  - Called when returned value from watcher is different from previous value.

````typescript
// The watch function:
$watch(watcher, listener);
````
````typescript
// To detect in HTML <span>{{name}}</span>
$watch(() => {
    return person.name
}, (value) => {
    span.textContent = value
});
````
This is essentially what interpolation and directives like ng-bind do.
Angular.js uses directives to reflect data model in the DOM.

````javascript
function link(scope, element) {
    slider.on('changed', (slide) => {
        scope.slide = slide;
        
        // detect changes on the current component
        $scope.$digest();
        
        // or run change detection for the all app
        $rootScope.$digest();
    })
}
````

Angular Change Detection Cycle
--------------------------------------------------------------------------------------------------
- No longer uses the concept of watcher.
- No longer has explicit scopes.
- No longer calls $scope.$digest(). 
- Triggered:
  - Every asynchronous event
  - $timeout
  - $http
  - view.detectChanges()
  - ApplicationRef.tick()
- Zones:
  - Used to patch all asynchronous events.
  - Using zones means no manual triggering of change detection is required for most events.
  - Framework subscribes to **onMicrotaskEmpty** event and gets notified when an async event is completed.
  - This event is fired when there is no more microtasks enqueued in the current VM Turn.
  - Trigger change detection manually as well using **view.detectChanges** or **ApplicationRef.tick** methods .
- So even if a watcher is now implemented differently, the digest loop is still there and altered its name to change detection cycle.

### Implementation
- Uses property mappings to connect data model and DOM.
  ````html
  <span [textContent]="person.name"></span>
  ````
- Update functions:
  - Instead of watchers, now has update functions.
  - Used to track model properties.
  - Generated by the framework compiler and cannot be accessed.
  - Strongly connected to the underlying DOM.
  - Stored in [updateRenderer](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/view.ts#L140) property name on a [view](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/view.ts#L22).
  - viewDef() returns a [ViewDefinition](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L21).
  - updateRender is type [ViewUpdateFn](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L61).
  ````typescript
  export interface ViewUpdateFn {
    (check: NodeCheckFn, view: ViewData): void;
  }
  ````
  ````typescript
  // angular/packages/core/src/view/view.ts #130 ViewDefinition
  export function viewDef(
    flags: ViewFlags, nodes: NodeDef[], updateDirectives?: ViewUpdateFn,
    updateRenderer?: ViewUpdateFn): ViewDefinition {
  // lots of stuff here ...
  return {
    // Will be filled later...
    factory: null,
    nodeFlags: viewNodeFlags,
    rootNodeFlags: viewRootNodeFlags,
    nodeMatchedQueries: viewMatchedQueries, flags,
    nodes: nodes,
    updateDirectives: updateDirectives || NOOP,
    updateRenderer: updateRenderer || NOOP,
    handleEvent: handleEvent || NOOP,
    bindingCount: viewBindingCount,
    outputCount: viewDisposableCount, lastRenderRootNode
  };
  ````
  - Track only model changes instead of a tracking anything in Angular.js.
  - Each component gets one watcher which tracks all component properties used in a template.
  - Instead of returning a value it calls **checkAndUpdateTextInline** function for each property being tracked.
  - This function compares previous value to the current and updates DOM if changed.

### tick()
- In development mode, tick() also performs a second change detection cycle to ensure that no further changes are detected.
- AngularJS walks the tree of watchers and updates DOM during digest.
- Angular walks a tree of components and calls **renderer update functions** during change detection cycle.
- It’s done as part of a checking and updating view process.

- Angular enforces so-called unidirectional data flow from top to bottom.
- No component lower in hierarchy is allowed to update properties of a parent component after parent changes have been processed.
- If a component updates parent model properties in the **DoCheck** hook, it’s fine since this lifecycle hook is called before detecting properties changes.
- But if the property is updated in some other way, for example, from the **AfterViewChecked** hook which is called after processing changes, you’ll get an error in the development mode: Expression has changed after it was checked

````typescript
class SliderComponent {
  ngOnInit() {
    slider.on('changed', (slide) => {
      this.slide = slide

      // detect changes on the current component
      // this.cd is an injected ChangeDetector instance
      this.cd.detectChanges();

      // or run change detection for the all app
      // this.appRef is an ApplicationRef instance
      this.appRef.tick();
    })
  }
}
````
