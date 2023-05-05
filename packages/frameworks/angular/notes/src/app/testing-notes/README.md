# Angular Testing Notes
https://angular.io/guide/testing

## Jasmine
The Jasmine test framework provides everything needed to write basic tests. It ships with an HTML test runner that executes tests in the browser.

Tests written in Jasmine are called specs . The filename extension must be .spec.ts, the convention adhered to by karma.conf.js and other tooling.

Put spec files somewhere within the src/app/ folder. The karma.conf.js tells karma to look for spec files there
## Angular Testing Utilities
Angular testing utilities create a test environment for the Angular application code under test. Use them to condition and control parts of the application as they interact within the Angular environment.

## Karma
The karma test runner is ideal for writing and running unit tests while developing the application. It can be an integral part of the project's development and continuous integration processes. This guide describes how to set up and run tests with karma.

Compile and run it in karma from the command line using the following command:
```bash
npm test
```
The documentation setup defines the test command in the scripts section of npm's package.json. The Angular CLI has different commands to do the same thing. Adjust accordingly.

## Protractor
Use protractor to write and run end-to-end (e2e) tests. End-to-end tests explore the application as users experience it. In e2e testing, one process runs the real application and a second process runs protractor tests that simulate user behavior and assert that the application respond in the browser as expected.

## Isolated unit tests vs. the Angular testing utilities
You should write isolated unit tests for pipes and services.

You can test components in isolation as well. However, isolated unit tests don't reveal how components interact with Angular. In particular, they can't reveal how a component class interacts with its own template or with other components.

Such tests require the Angular testing utilities. The Angular testing utilities include the TestBed class and several helper functions from @angular/core/testing. 

## Test debugging

Debug specs in the browser in the same way that you debug an application.

1. Reveal the karma browser window (hidden earlier).
2. Click the DEBUG button; it opens a new browser tab and re-runs the tests.
3. Open the browser's “Developer Tools” (Ctrl-Shift-I on windows; Command-Option-I in OSX).
4. Pick the "sources" section.
5. Open the 1st.spec.ts test file (Control/Command-P, then start typing the name of the file).
6. Set a breakpoint in the test.
7. Refresh the browser, and it stops at the breakpoint.

## TestBed
TestBed is the first and most important of the Angular testing utilities. It creates an Angular testing module—an @NgModule class—that you configure with the configureTestingModule method to produce the module environment for the class you want to test. In effect, you detach the tested component from its own application module and re-attach it to a dynamically-constructed Angular test module tailored specifically for this battery of tests.

The configureTestingModule method takes an @NgModule-like metadata object. The metadata object can have most of the properties of a normal NgModule.

This metadata object simply declares the component to test, BannerComponent. The metadata lack imports because (a) the default testing module configuration already has what BannerComponent needs and (b) BannerComponent doesn't interact with any other components.

Call configureTestingModule within a beforeEach so that TestBed can reset itself to a base state before each test runs.

## createComponent
After configuring TestBed, you tell it to create an instance of the component-under-test. In this example, TestBed.createComponent creates an instance of BannerComponent and returns a component test fixture.

Do not re-configure TestBed after calling createComponent.

The createComponent method closes the current TestBed instance to further configuration. You cannot call any more TestBed configuration methods, not configureTestingModule nor any of the override... methods. If you try, TestBed throws an error.

ComponentFixture, DebugElement, and query(By.css)

The createComponent method returns a ComponentFixture, a handle on the test environment surrounding the created component. The fixture provides access to the component instance itself and to the DebugElement, which is a handle on the component's DOM element.

The title property value is interpolated into the DOM within ```html<h1>``` tags. Use the fixture's DebugElement to query for the ```html<h1>``` element by CSS selector.

The query method takes a predicate function and searches the fixture's entire DOM tree for the first element that satisfies the predicate. The result is a different DebugElement, one associated with the matching DOM element.

The queryAll method returns an array of all DebugElements that satisfy the predicate.

A predicate is a function that returns a boolean. A query predicate receives a DebugElement and returns true if the element meets the selection criteria.

The By class is an Angular testing utility that produces useful predicates. Its By.css static method produces a standard CSS selector predicate that filters the same way as a jQuery selector.

Finally, the setup assigns the DOM element from the DebugElement nativeElement property to el. The tests assert that el contains the expected title text.

## detectChanges: Angular change detection within a test
Each test tells Angular when to perform change detection by calling fixture.detectChanges(). The first test does so immediately, triggering data binding and propagation of the title property to the DOM element.

The second test changes the component's title property and only then calls fixture.detectChanges(); the new value appears in the DOM element.

In production, change detection kicks in automatically when Angular creates a component or the user enters a keystroke or an asynchronous activity (e.g., AJAX) completes.

The TestBed.createComponent does not trigger change detection. The fixture does not automatically push the component's title property value into the data bound element.

This behavior (or lack of it) is intentional. It gives the tester an opportunity to inspect or change the state of the component before Angular initiates data binding or calls lifecycle hooks.

## Automatic change detection

The BannerComponent tests frequently call detectChanges. Some testers prefer that the Angular test environment run change detection automatically.

That's possible by configuring the TestBed with the ComponentFixtureAutoDetect provider. First import it from the testing utility library:
```typescript
import { ComponentFixtureAutoDetect } from '@angular/core/testing';

// Then add it to the providers array of the testing module configuration:
TestBed.configureTestingModule({
  declarations: [ BannerComponent ],
  providers: [
    { provide: ComponentFixtureAutoDetect, useValue: true }
  ]
})
```
You can still call detect changes manually if needed.
Rather than wonder when the test fixture will or won't perform change detection, the samples in this guide always call detectChanges() explicitly. There is no harm in calling detectChanges() more often than is strictly necessary.

## Test a component with an external template
The TestBed.createComponent method is synchronous. But the Angular template compiler must read the external files from the file system before it can create a component instance. That's an asynchronous activity. The previous setup for testing the inline component won't work for a component with an external template.

The test setup for BannerComponent must give the Angular template compiler time to read the files. The logic in the beforeEach of the previous spec is split into two beforeEach calls. The first beforeEach handles asynchronous compilation.

The body of the async argument looks much like the body of a synchronous beforeEach. There is nothing obviously asynchronous about it. For example, it doesn't return a promise and there is no done function to call as there would be in standard Jasmine asynchronous tests. Internally, async arranges for the body of the beforeEach to run in a special async test zone that hides the mechanics of asynchronous execution.

All this is necessary in order to call the asynchronous TestBed.compileComponents method.

The TestBed.configureTestingModule method returns the TestBed class so you can chain calls to other TestBed static methods such as compileComponents.

The TestBed.compileComponents method asynchronously compiles all the components configured in the testing module. In this example, the BannerComponent is the only component to compile. When compileComponents completes, the external templates and css files have been "inlined" and TestBed.createComponent can create new instances of BannerComponent synchronously.

WebPack developers need not call compileComponents because it inlines templates and css as part of the automated build process that precedes running the test.

Calling compileComponents closes the current TestBed instance to further configuration. You cannot call any more TestBed configuration methods, not configureTestingModule nor any of the override... methods. The TestBed throws an error if you try.

You can count on the test runner to wait for the first asynchronous beforeEach to finish before calling the second.

# Realy!? The runner will wait for an asynchronous event? Doesn't that make it synchronous!!?

## Test a component with a dependency
Components often have service dependencies.

This time, in addition to declaring the component-under-test, the configuration adds a UserService provider to the providers list. But not the real UserService.

## Provide service test doubles
A component-under-test doesn't have to be injected with real services. In fact, it is usually better if they are test doubles (stubs, fakes, spies, or mocks). The purpose of the spec is to test the component, not the service, and real services can be trouble.

Injecting the real UserService could be a nightmare. The real service might ask the user for login credentials and attempt to reach an authentication server. These behaviors can be hard to intercept. It is far easier and safer to create and register a test double in place of the real UserService.

## Get injected services
The tests need access to the (stub) UserService injected into the WelcomeComponent.

Angular has a hierarchical injection system. There can be injectors at multiple levels, from the root injector created by the TestBed down through the component tree.

The safest way to get the injected service, the way that always works, is to get it from the injector of the component-under-test. The component injector is a property of the fixture's DebugElement.
```typescript
fixture.debugElement.injector.get(SomeService);
```

## TestBed.get
You may also be able to get the service from the root injector via TestBed.get. This is easier to remember and less verbose. But it only works when Angular injects the component with the service instance in the test's root injector.
```typescript
TestBed.get(SomeService);
```

## Always get the service from an injector
Do not reference the userServiceStub object that's provided to the testing module in the body of your test. It does not work! The userService instance injected into the component is a completely different object, a clone of the provided userServiceStub.

## Test a component with an async service
In general, tests should not make calls to remote servers. They should emulate such calls.

### Spying on the real service
This setup is similar to the welcome.component.spec setup. But instead of creating a stubbed service object, it injects the real service (see the testing module providers) and replaces the critical getQuote method with a Jasmine spy.
```typescript
// Setup spy on the `getQuote` method
spy = spyOn(twainService, 'getQuote')
        .and.returnValue(Promise.resolve(testQuote));
```
The spy is designed such that any call to getQuote receives an immediately resolved promise with a test quote. The spy bypasses the actual getQuote method and therefore does not contact the server.

Faking a service instance and spying on the real service are both great options. Pick the one that seems easiest for the current test suite. Don't be afraid to change your mind.

Spying on the real service isn't always easy, especially when the real service has injected dependencies. You can stub and spy at the same time, as shown in an example below.

### The async function in it
```typescript
it('should show quote after getQuote promise (async)', async(() => {
  fixture.detectChanges();

  fixture.whenStable().then(() => { // wait for async getQuote
    fixture.detectChanges();        // update view with quote
    expect(el.textContent).toBe(testQuote);
  });
}));
```
The async function is one of the Angular testing utilities. It simplifies coding of asynchronous tests by arranging for the tester's code to run in a special async test zone as discussed earlier when it was called in a beforeEach.

Although async does a great job of hiding asynchronous boilerplate, some functions called within a test (such as fixture.whenStable) continue to reveal their asynchronous behavior.

### whenStable
The test must wait for the getQuote promise to resolve in the next turn of the JavaScript engine.

This test has no direct access to the promise returned by the call to twainService.getQuote because it is buried inside TwainComponent.ngOnInit and therefore inaccessible to a test that probes only the component API surface.

Fortunately, the getQuote promise is accessible to the async test zone, which intercepts all promises issued within the async method call no matter where they occur.

The ComponentFixture.whenStable method returns its own promise, which resolves when the getQuote promise finishes. In fact, the whenStable promise resolves when all pending asynchronous activities within this test complete—the definition of "stable."

Then the test resumes and kicks off another round of change detection (fixture.detectChanges), which tells Angular to update the DOM with the quote. The getQuote helper method extracts the display element text and the expectation confirms that the text matches the test quote.

### The fakeAsync Function
Provides a more linear experience.
```typescript
it('should show quote after getQuote promise (fakeAsync)', fakeAsync(() => {
  fixture.detectChanges();
  tick();                  // wait for async getQuote
  fixture.detectChanges(); // update view with quote
  expect(el.textContent).toBe(testQuote);
}));
```
Notice that fakeAsync replaces async as the it argument. The fakeAsync function is another of the Angular testing utilities.

Like async, it takes a parameterless function and returns a function that becomes the argument to the Jasmine it call.

The fakeAsync function enables a linear coding style by running the test body in a special fakeAsync test zone.

The principle advantage of fakeAsync over async is that the test appears to be synchronous. There is no then(...) to disrupt the visible flow of control. The promise-returning fixture.whenStable is gone, replaced by tick().

There are limitations. For example, you cannot make an XHR call from within a fakeAsync.

### The tick function    
The tick function is one of the Angular testing utilities and a companion to fakeAsync. You can only call it within a fakeAsync body.

Calling tick() simulates the passage of time until all pending asynchronous activities finish, including the resolution of the getQuote promise in this test case.

It returns nothing. There is no promise to wait for. Proceed with the same test code that appeared in the whenStable.then() callback.

### jasmine.done    
While the async and fakeAsync functions greatly simplify Angular asynchronous testing, you can still fall back to the traditional Jasmine asynchronous testing technique.

You can still pass it a function that takes a done callback. Now you are responsible for chaining promises, handling errors, and calling done at the appropriate moment.
```typescript
it('should show quote after getQuote promise (done)', (done: any) => {
  fixture.detectChanges();

  // get the spy promise and wait for it to resolve
  spy.calls.mostRecent().returnValue.then(() => {
    fixture.detectChanges(); // update view with quote
    expect(el.textContent).toBe(testQuote);
    done();
  });
});
```
Writing test functions with done, while more cumbersome than async and fakeAsync, is a viable and occasionally necessary technique. For example, you can't call async or fakeAsync when testing code that involves the intervalTimer, as is common when testing async Observable methods.
