import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck,
  OnChanges, OnDestroy,
  OnInit, SimpleChanges
} from '@angular/core';
import {MyModel} from './model/my-model';

/**
 * https://angular.io/guide/lifecycle-hooks
 * Order:
 * -------
 * 1. constructor()
 * 2. ngOnChanges()
 * 3. ngOnInit()
 * 4. ngDoCheck()
 * 5. ngAfterContentInit()
 * 6. ngAfterContentChecked()
 * 7. ngAfterViewInit()
 * 8. ngAFterViewChecked()
 * 9. ngOnDestroy()
 *
 * Setup
 * ------
 * Parent > Child
 * Parent ChangeDetectionStrategy.OnPush
 * Child ChangeDetectionStrategy.OnPush
 *
 * Note:
 *  Changing the ChangeDectectionStrategy has NO effect on the order listed below!
 *
 *  Why not?
 *
 *  I thought change detection should only run on the child when an input property
 *  changed when the ChangeDetectionStragety is set to OnPush?
 *
 *  => The change detection still runs, but they DOM is not updated.
 *
 * On Page Load:
 * --------------
 * 1. Parent Constructor
 * 2.   Child Constructor
 * 3. Parent ngOnInit()
 * 4. Parent ngDoCheck()
 * 5. Parent ngAfterContentInit()
 * 6. Parent ngAfterContentCheck()
 * 7.   Child ngOnChanges()
 * 8.   Child ngOnInit()
 * 9.   Child ngDoCheck()
 * 10.  Child ngAfterContentInit()
 * 11.  Child ngAfterContentChecked()
 * 12.  Child ngAfterViewInit()
 * 13.  Child ngAfterViewChecked()
 * 14. Parent ngAfterViewInit()
 * 15. Parent ngAfterViewChecked
 *
 * Change number input
 * --------------------
 * 1. Parent ngDoCheck()
 * 2. Parent ngAfterContentChecked()
 * 3.   Child ngOnChanges()
 * 4.   Child ngDoCheck()
 * 5.   Child ngAfterContentChecked()
 * 6.   Child ngAfterViewChecked()
 * 7. Parent ngAfterViewChecked
 *
 * Change Object Property:
 * ------------------------
 * 1. Parent ngDoCheck()
 * 2. Parent ngAfterContentChecked()
 * 3.   Child ngDoCheck()
 * 4.   Child ngAfterContentChecked()
 * 5.   Child ngAfterViewChecked()
 * 6. Parent ngAfterViewChecked
 *
 * Change Model Property:
 * -----------------------
 * 1. Parent ngDoCheck()
 * 2. Parent ngAfterContentChecked()
 * 3.   Child ngDoCheck()
 * 4.   Child ngAfterContentChecked()
 * 5.   Child ngAfterViewChecked()
 * 6. Parent ngAfterViewChecked
 *
 * Change Parent Model Property Not Passed to Child
 * -------------------------------------------------
 * 1. Parent ngDoCheck()
 * 2. Parent ngAfterContentChecked()
 * 3.   Child ngDoCheck()
 * 4.   Child ngAfterContentChecked()
 * 5.   Child ngAfterViewChecked()
 * 6. Parent ngAfterViewChecked
 */
@Component({
  selector: 'app-my-lifecycle-hooks',
  templateUrl: './my-lifecycle-hooks.component.html',
  styleUrls: ['./my-lifecycle-hooks.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MyLifecycleHooksComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {

  numberForChild = 0;
  objectForChild = {prop: 0};
  modelForChild: MyModel;
  autoUpdate = false;
  modelNotForChild: MyModel;
  private _privateVar: 0;

  /**
   *  Constructors()
   *  https://angular.io/guide/lifecycle-hooks#oninit
   *  - Don't fetch data in a component constructor.
   *  - Shouldn't worry that a new component will try to contact a remote server when created under test or before you
   *    decide to display it.
   *  - Constructors should do no more than set the initial local variables to simple values.
   *  - Experienced developers agree that components should be cheap and safe to construct.
   */
  constructor() {
    console.warn('(1) Parent constructor() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    this.modelForChild = new MyModel('Bob');
    this.modelNotForChild = new MyModel('Internal');

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
  }

  /**
   * OnChanges()
   * https://angular.io/api/core/OnChanges
   * - Lifecycle hook that is called when any data-bound property of a directive changes.
   * - Called right after the data-bound properties have been checked and before view and content children are checked
   *   if at least one of them has changed.
   * - The `changes` parameter contains the changed properties.
   *
   * From Guide:
   * - Respond when Angular (re)sets data-bound input properties.
   * - Receives a {@link SimpleChanges} object of current and previous property values.
   * - Called before ngOnInit() and whenever one or more data-bound input properties change.
   *
   * - Only called for/if there is an @input variable set by parent.
   *
   * Use:
   * - To track parent component bound properties we can now use OnChanges life cycle hook.
   *
   * '''typescript
   * interface OnChanges {
   *   ngOnChanges(changes: SimpleChanges): void
   * }
   * ```
   *
   * ```typescript
   * export interface SimpleChanges {
   *   [propName: string]: SimpleChange;
   * }
   * ```
   *
   * ```typescript
   * export declare class SimpleChange {
   *   previousValue: any;
   *   currentValue: any;
   *   firstChange: boolean;
   *
   *   constructor(previousValue: any, currentValue: any, firstChange: boolean);
   *   isFirstChange(): boolean;
   * }
   * ```
   */
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.warn('(Not called since there are no input properties) Parent ngOnChanges(changes: SimpleChanges) { SimpleChanges, numberForChild, ' +
      'objectForChild, modelForChild, modelNotForChild } ');
    console.log(changes);
    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }

  /**
   * OnInit()
   * https://angular.io/api/core/OnInit
   * - Lifecycle hook that is called after data-bound properties of a directive are initialized.
   * - Called right after the directive's data-bound properties have been checked for the first time, and before any of
   *   its children have been checked.
   * - It is invoked only once when the directive is instantiated.
   *
   * From Guide:
   * - Initialize the directive/component after Angular first displays the data-bound properties and sets the
   *   directive/component's input properties.
   * - Called once, after the first ngOnChanges().
   *
   * - Use ngOnInit() for two main reasons:
   *   1. To perform complex initializations shortly after construction.
   *   2. To set up the component after Angular sets the input properties.
   *
   * - Good place for a component to fetch its initial data.
   * - Angular will call soon after creating the component.
   * - This is where the heavy initialization logic belongs.
   *
   * Use:
   * - Watch third-party widgets outside Angular ecosystem and run change detection manually.
   */
  ngOnInit(): void {
    console.warn('(3) Parent ngOnInit() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    // Try to change a property exposed in the DOM:
    if (this.autoUpdate) {
      this.numberForChild++;
    }
    if (this.autoUpdate) {
      this.objectForChild.prop++;
    }
    if (this.autoUpdate) {
      this.modelForChild.prop = this.modelForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this.modelNotForChild.prop = this.modelNotForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this._privateVar++;
    }

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }

  /**
   * DoCheck()
   * https://angular.io/api/core/DoCheck
   * - Lifecycle hook that is called when Angular dirty checks a directive.
   * - Called to check the changes in the directives in addition to the default algorithm.
   * - Default change detection algorithm looks for differences by comparing bound-property values by reference across
   *   change detection runs.
   * - Note that a directive typically should not use both `DoCheck` and {@link OnChanges} to respond to changes on the
   *   same input, as `ngOnChanges` will continue to be called when the default change detector detects changes.
   * - See {@link KeyValueDiffers} and {@link IterableDiffers} for implementing custom dirty checking for collections.
   *
   * From Guide:
   * - Detect and act upon changes that Angular can't or won't detect on its own.
   * - Called during every change detection run, immediately after ngOnChanges() and ngOnInit().
   *
   * - Use the DoCheck hook to detect and act upon changes that Angular doesn't catch on its own.
   * - Use this method to detect a change that Angular overlooked.
   *
   * - Beware! Called frequently!
   * - Called in every change detection cycle anywhere on the page
   *
   * - While the ngDoCheck() hook can detect when the hero's name has changed, it has a frightful cost.
   * - This hook is called with enormous frequency—after every change detection cycle no matter where the change
   *   occurred.
   * - Most of these initial checks are triggered by Angular's first rendering of unrelated data elsewhere on the page.
   * - Mere mousing into another <input> triggers a call.
   * - Relatively few calls reveal actual changes to pertinent data.
   * - Clearly our implementation must be very lightweight or the user experience suffers.
   *
   * Use:
   * - Track self-component properties and calculate computed properties.
   * - since this hook is triggered before Angular process properties changes on the current component,
   *   we can do whatever we need to get correctly reflected changes in UI.
   */
  ngDoCheck(): void {
    console.warn('(4) Parent ngDoCheck() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    // Try to change a property exposed in the DOM:
    if (this.autoUpdate) {
      this.numberForChild++;
    }
    if (this.autoUpdate) {
      this.objectForChild.prop++;
    }
    if (this.autoUpdate) {
      this.modelForChild.prop = this.modelForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this.modelNotForChild.prop = this.modelNotForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this._privateVar++;
    }

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }

  /**
   * AfterContentInit()
   * https://angular.io/api/core/AfterContentInit
   * - Lifecycle hook that is called after a directive's content has been fully initialized.
   *
   * From Guide:
   * - Respond after Angular projects external content into the component's view.
   * - Called once after the first ngDoCheck().
   * - A component-only hook.
   *
   * - Angular calls after Angular projects external content into the component.
   */
  ngAfterContentInit(): void {
    console.warn('(5) Parent ngAfterContentInit() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    // Try to change a property exposed in the DOM:
    if (this.autoUpdate) {
      this.numberForChild++;
    }
    if (this.autoUpdate) {
      this.objectForChild.prop++;
    }
    if (this.autoUpdate) {
      this.modelForChild.prop = this.modelForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this.modelNotForChild.prop = this.modelNotForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this._privateVar++;
    }

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }

  /**
   * AfterContentChecked()
   * https://angular.io/api/core/AfterContentChecked
   * - Lifecycle hook that is called after every check of a directive's content.
   *
   * From Guide:
   * - Respond after Angular checks the content projected into the component.
   * - Called after the ngAfterContentInit() and every subsequent ngDoCheck().
   * - A component-only hook.
   *
   * - Beware! Called frequently!
   * - Called in every change detection cycle anywhere on the page
   *
   * - Angular calls after Angular projects external content into the component.
   */
  ngAfterContentChecked(): void {
    console.warn('(6) Parent ngAfterContentChecked() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    // Try to change a property exposed in the DOM:
    if (this.autoUpdate) {
      this.numberForChild++;
    }
    if (this.autoUpdate) {
      this.objectForChild.prop++;
    }
    if (this.autoUpdate) {
      this.modelForChild.prop = this.modelForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this.modelNotForChild.prop = this.modelNotForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this._privateVar++;
    }

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }

  /**
   * AfterViewInit()
   * https://angular.io/api/core/AfterViewInit
   * - Lifecycle hook that is called after a component's view has been fully initialized.
   *
   * From Guide:
   * - Respond after Angular initializes the component's views and child views.
   * - Called once after the first ngAfterContentChecked().
   * - A component-only hook.
   */
  ngAfterViewInit(): void {
    console.warn('(14) Parent ngAfterViewInit() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    // Try to change a property exposed in the DOM:
    if (this.autoUpdate) {
      this.numberForChild++;
    }
    if (this.autoUpdate) {
      this.objectForChild.prop++;
    }
    if (this.autoUpdate) {
      this.modelForChild.prop = this.modelForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this.modelNotForChild.prop = this.modelNotForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this._privateVar++;
    }

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }

  /**
   * AfterViewChecked()
   * https://angular.io/api/core/AfterViewChecked
   * - Lifecycle hook that is called after every check of a component's view.
   *
   * From Guide:
   * - Respond after Angular checks the component's views and child views.
   * - Called after the ngAfterViewInit and every subsequent ngAfterContentChecked().
   * - A component-only hook.
   *
   * - viewChild is updated after the view has been checked
   *
   * - Beware! Called frequently!
   * - Called in every change detection cycle anywhere on the page
   */
  ngAfterViewChecked(): void {
    console.warn('(15) Parent ngAfterViewChecked() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    // Try to change a property exposed in the DOM:
    // Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous value:
    // 'x'. Current value: '!x'.
    // this.numberForChild++;
    // this.objectForChild.prop++;
    // this.modelForChild.prop = this.modelForChild.prop + '.';
    // this.modelNotForChild.prop = this.modelNotForChild.prop + '.';

    // It's safe to change private vars as long as they're not exposed to the DOM.
    this._privateVar++;

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }

  /**
   * OnDestroy()
   * https://pr18487-aedf0aa.ngbuilds.io/api/core/OnDestroy
   * - Lifecycle hook that is called when a directive, pipe or service is destroyed.
   * - Callback is typically used for any custom cleanup that needs to occur when the instance is destroyed.
   *
   * From Guide:
   * - Cleanup just before Angular destroys the directive/component.
   * - Unsubscribe Observables and detach event handlers to avoid memory leaks.
   * - Called just before Angular destroys the directive/component.
   *
   * - Put cleanup logic in ngOnDestroy(), the logic that must run before Angular destroys the directive.
   * - This is the time to notify another part of the application that the component is going away.
   * - This is the place to free resources that won't be garbage collected automatically.
   * - Unsubscribe from Observables and DOM events.
   * - Stop interval timers.
   * - Unregister all callbacks that this directive registered with global or application services.
   * - You risk memory leaks if you neglect to do so.
   */
  ngOnDestroy(): void {
    console.warn('Parent ngOnDestroy() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    // Try to change a property exposed in the DOM:
    if (this.autoUpdate) {
      this.numberForChild++;
    }
    if (this.autoUpdate) {
      this.objectForChild.prop++;
    }
    if (this.autoUpdate) {
      this.modelForChild.prop = this.modelForChild.prop + '.';
    }
    if (this.autoUpdate) {
      this.modelNotForChild.prop = this.modelNotForChild.prop + '.';
    }

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }

  manualChange(): void {
    console.warn('Parent manualChange() { numberForChild, objectForChild, modelForChild, modelNotForChild } ');

    // Manual-change property
    this.numberForChild++;
    this.objectForChild.prop++;
    this.modelForChild.prop = this.modelForChild.prop + '.';
    this.modelNotForChild.prop = this.modelNotForChild.prop + '.';

    console.log(this.numberForChild);
    console.log(this.objectForChild);
    console.log(this.modelForChild);
    console.log(this.modelNotForChild);
  }
}
