# Lifecycle Hooks

https://angular.io/guide/lifecycle-hooks

Order:
--------------------------------------------------------------------------------------------------
1. constructor()
2. ngOnChanges()
3. ngOnInit()
4. ngDoCheck()
5. ngAfterContentInit()
6. ngAfterContentChecked()
7. ngAfterViewInit()
8. ngAFterViewChecked()
9. ngOnDestroy()

Constructors()
--------------------------------------------------------------------------------------------------
https://angular.io/guide/lifecycle-hooks#oninit
- Don't fetch data in a component constructor.
- Shouldn't worry that a new component will try to contact a remote server when created under test or before you decide to display it.
- Constructors should do no more than set the initial local variables to simple values.
- Experienced developers agree that components should be cheap and safe to construct.


OnChanges()
--------------------------------------------------------------------------------------------------
https://angular.io/api/core/OnChanges
- Lifecycle hook that is called when any data-bound property of a directive changes.
- Called right after the data-bound properties have been checked and before view and content children are checked
if at least one of them has changed.
- The `changes` parameter contains the changed properties.

From Guide:
- Respond when Angular (re)sets data-bound input properties.
- Receives a {@link SimpleChanges} object of current and previous property values.
- Called before ngOnInit() and whenever one or more data-bound input properties change.

- Only called for/if there is an @input variable set by parent.

Use:
- To track parent component bound properties we can now use OnChanges life cycle hook.

'''typescript
interface OnChanges {
  ngOnChanges(changes: SimpleChanges): void
}
```

```typescript
export interface SimpleChanges {
  [propName: string]: SimpleChange;
}
```

```typescript
export declare class SimpleChange {
  previousValue: any;
  currentValue: any;
  firstChange: boolean;

  constructor(previousValue: any, currentValue: any, firstChange: boolean);
    isFirstChange(): boolean;
}
```

OnInit()
--------------------------------------------------------------------------------------------------
https://angular.io/api/core/OnInit
- Lifecycle hook that is called after data-bound properties of a directive are initialized.
- Called right after the directive's data-bound properties have been checked for the first time, and before any of its children have been checked.
- It is invoked only once when the directive is instantiated.

From Guide:
- Initialize the directive/component after Angular first displays the data-bound properties and sets the directive/component's input properties.
- Called once, after the first ngOnChanges().

- Use ngOnInit() for two main reasons:
  1. To perform complex initializations shortly after construction.
  2. To set up the component after Angular sets the input properties.

- Good place for a component to fetch its initial data.
- Angular will call soon after creating the component.
- This is where the heavy initialization logic belongs.

Use:
- Watch third-party widgets outside Angular ecosystem and run change detection manually.

DoCheck()
--------------------------------------------------------------------------------------------------
https://angular.io/api/core/DoCheck
- Lifecycle hook that is called when Angular dirty checks a directive.
- Called to check the changes in the directives in addition to the default algorithm.
- Default change detection algorithm looks for differences by comparing bound-property values by reference across change detection runs.
- Note that a directive typically should not use both `DoCheck` and {@link OnChanges} to respond to changes on the same input, as `ngOnChanges` will continue to be called when the default change detector detects changes.
- See {@link KeyValueDiffers} and {@link IterableDiffers} for implementing custom dirty checking for collections.

From Guide:
- Detect and act upon changes that Angular can't or won't detect on its own.
- Called during every change detection run, immediately after ngOnChanges() and ngOnInit().

- Use the DoCheck hook to detect and act upon changes that Angular doesn't catch on its own.
- Use this method to detect a change that Angular overlooked.

- Beware! Called frequently!
- Called in every change detection cycle anywhere on the page

- While the ngDoCheck() hook can detect when the hero's name has changed, it has a frightful cost.
- This hook is called with enormous frequency—after every change detection cycle no matter where the change occurred.
- Most of these initial checks are triggered by Angular's first rendering of unrelated data elsewhere on the page.
- Mere mousing into another <input> triggers a call.
- Relatively few calls reveal actual changes to pertinent data.
- Clearly our implementation must be very lightweight or the user experience suffers.

Use:
- Track self-component properties and calculate computed properties. Since this hook is triggered before Angular process properties changes on the current component, we can do whatever we need to get correctly reflected changes in UI.

AfterContentInit()
--------------------------------------------------------------------------------------------------
https://angular.io/api/core/AfterContentInit
- Lifecycle hook that is called after a directive's content has been fully initialized.

From Guide:
- Respond after Angular projects external content into the component's view.
- Called once after the first ngDoCheck().
- A component-only hook.

- Angular calls after Angular projects external content into the component.

AfterContentChecked()
--------------------------------------------------------------------------------------------------
https://angular.io/api/core/AfterContentChecked
- Lifecycle hook that is called after every check of a directive's content.

From Guide:
- Respond after Angular checks the content projected into the component.
- Called after the ngAfterContentInit() and every subsequent ngDoCheck().
- A component-only hook.

- Beware! Called frequently!
- Called in every change detection cycle anywhere on the page

- Angular calls after Angular projects external content into the component.

AfterViewInit()
--------------------------------------------------------------------------------------------------
https://angular.io/api/core/AfterViewInit
- Lifecycle hook that is called after a component's view has been fully initialized.

From Guide:
- Respond after Angular initializes the component's views and child views.
- Called once after the first ngAfterContentChecked().
- A component-only hook.

AfterViewChecked()
--------------------------------------------------------------------------------------------------
https://angular.io/api/core/AfterViewChecked
- Lifecycle hook that is called after every check of a component's view.

From Guide:
- Respond after Angular checks the component's views and child views.
- Called after the ngAfterViewInit and every subsequent ngAfterContentChecked().
- A component-only hook.

- **viewChild** is updated after the view has been checked

- Beware! Called frequently!
- Called in every change detection cycle anywhere on the page

### Error: ExpressionChangedAfterItHasBeenCheckedError
- Try to change a property exposed in the DOM:
  - Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value: 'x'. Current value: '!x'.
- It's safe to change private vars as long as they're not exposed to the DOM.

OnDestroy()
--------------------------------------------------------------------------------------------------
https://pr18487-aedf0aa.ngbuilds.io/api/core/OnDestroy
- Lifecycle hook that is called when a directive, pipe or service is destroyed.
- Callback is typically used for any custom cleanup that needs to occur when the instance is destroyed.

From Guide:
- Cleanup just before Angular destroys the directive/component.
- Unsubscribe Observables and detach event handlers to avoid memory leaks.
- Called just before Angular destroys the directive/component.

- Put cleanup logic in ngOnDestroy(), the logic that must run before Angular destroys the directive.
- This is the time to notify another part of the application that the component is going away.
- This is the place to free resources that won't be garbage collected automatically.
- Unsubscribe from Observables and DOM events.
- Stop interval timers.
- Unregister all callbacks that this directive registered with global or application services.
- You risk memory leaks if you neglect to do so.
