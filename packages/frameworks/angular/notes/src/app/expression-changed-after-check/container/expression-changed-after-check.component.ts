import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  DoCheck,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { AppComponent } from "../../../../../../../../old-workspace/frameworks/angular/dictionary/src/app/app.component";
import { SharedService } from "../service/shared.service";

/**
 * # Expression Changed After Check
 * https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4
 *
 * Change Detection
 * -----------------------------------------------------------------------------------------------
 * - Angular is a tree of components.
 * - Change detection traverses the tree.
 * - Order of execution:
 *    - Update bound properties for all child components/directives.
 *    - Call OnChanges, OnInit, and DoCheck lifecycle hooks on all child components/directives.
 *    - Update DOM for the current component.
 *    - Run change detection for a child component.
 *    - Call AfterViewInit lifecycle hook for all child components/directives.
 *
 * ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
 * Previous value: '<some value>'. Current value: '<some other value>'.
 *
 * ````javascript
 * core.js 13485
 *
 * @param {?} view
 * @return {?}
 *
 * function checkNoChangesView(view) {
 *   markProjectedViewsForCheck(view);
 *   Services.updateDirectives(view, 1);
 *   execEmbeddedViewsAction(view, ViewAction.CheckNoChanges);
 *   Services.updateRenderer(view, 1);
 *   execComponentViewsAction(view, ViewAction.CheckNoChanges);
 *   // Note: We don't check queries for changes as we didn't do this in v2.x.
 *   // TODO(tbosch): investigate if we can enable the check again in v5.x with a nicer error message.
 *   view.state &= ~(64 | 32);
 * }
 * ````
 *
 * -----------------------------------------------------------------------------------------------
 * Causes:
 * - Parent
 *   - Changing its own property that it uses in its own template in AfterViewInit, AfterViewChecked hooks.
 *   - Changing a property that is NOT used in the template will NOT throw the ExpressionChangeAfterChecked error.
 *   - Changing a child input property binding that is used in the child template in AfterViewInit or AfterViewChecked lifecycle-hooks.
 *   - Changing a child input property binding that is NOT used in the child template in AfterViewInit or AfterViewChecked lifecycle-hooks.
 * - Child property binding change:
 *   - Changing a parent property used in parent template in AfterViewInit, AfterViewChecked hooks.
 * - Shared service:
 *   - The application is designed to have a service shared between a parent and a child component.
 *   - A child component sets a value to the service which in turn reacts by updating the property on the parent
 * component.
 *
 * Tests:
 * Parent changing childInputBindingUsedInTemplate in each lifecycle hook.
 * Parent changing childInputBindingNotUsedInTemplate in each lifecycle hook.
 */
@Component({
  selector: "app-expression-changed-after-check",
  template: `
    <h1>Expression changed after check</h1>
    <span>{{parentPropInTemplate}}</span>
    <h3>Shared service</h3>
    <p>{{sharedServiceProp}}</p>
    <p>{{sharedParentToChildProp}}</p>
    <p>{{sharedChildToParentProp}}</p>
    <app-child [childInputBindingUsedInTemplate]="childInputBindingUsedInTemplate"
               [childInputBindingNotUsedInTemplate]="childInputBindingNotUsedInTemplate"
               (childOutputEmitter)="onChildPropEmitter($event)">
    </app-child>
  `,
  styles: []
})
export class ExpressionChangedAfterCheckComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  parentPropInTemplate = "parentPropInTemplate";
  _parentPropNotInTemplate = "_parentPropNotInTemplate";

  childInputBindingUsedInTemplate = "childInputBindingUsedInTemplate";
  childInputBindingNotUsedInTemplate = "childInputBindingNotUsedInTemplate";

  sharedServiceProp = "sharedProp";
  sharedParentToChildProp = "parentToChildProp";
  sharedChildToParentProp: any;

  constructor(
    private _appComponent: AppComponent,
    private _sharedService: SharedService
  ) {
    console.warn("(1) Parent constructor(private _parent: AppComponent");

    // App
    console.log(this._appComponent);

    // Parent
    console.log("- Parent:");
    this.parentPropInTemplate = this.parentPropInTemplate + "-pC";
    this._parentPropNotInTemplate = this._parentPropNotInTemplate + "-pC";
    console.log(this.parentPropInTemplate);
    console.log(this._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    this.childInputBindingUsedInTemplate =
      this.childInputBindingUsedInTemplate + "-pC";
    this.childInputBindingNotUsedInTemplate =
      this.childInputBindingNotUsedInTemplate + "-pC";
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-pC";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedParentToChildProp = this.sharedParentToChildProp + "-pC";
    this._sharedService.parentToChildProp = this.sharedParentToChildProp;
    console.log(this.sharedServiceProp);
    console.log(this.sharedParentToChildProp);
    console.log(this.sharedChildToParentProp); // undefined
    console.log("\n");
  }

  /**
   * THIS IS NOT CALLED IF THERE ARE NO INPUTS
   *
   * @param {SimpleChanges} changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.warn("(3) Parent ngOnChanges(simpleChanges: SimpleChanges)");
    console.log(changes);

    // Parent
    console.log("- Parent:");
    this.parentPropInTemplate = this.parentPropInTemplate + "-pOC";
    this._parentPropNotInTemplate = this._parentPropNotInTemplate + "-pOC";
    console.log(this.parentPropInTemplate);
    console.log(this._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    this.childInputBindingUsedInTemplate =
      this.childInputBindingUsedInTemplate + "-pOC";
    this.childInputBindingNotUsedInTemplate =
      this.childInputBindingNotUsedInTemplate + "-pOC";
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-pOC";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedParentToChildProp = this.sharedParentToChildProp + "-pOC";
    this._sharedService.parentToChildProp = this.sharedParentToChildProp;
    console.log(this.sharedServiceProp);
    console.log(this.sharedParentToChildProp);
    console.log(this.sharedChildToParentProp);
    console.log("\n");
  }

  ngOnInit(): void {
    console.warn("(4) Parent ngOnInit");

    // Parent
    console.log("- Parent:");
    this.parentPropInTemplate = this.parentPropInTemplate + "-pOI";
    this._parentPropNotInTemplate = this._parentPropNotInTemplate + "-pOI";
    console.log(this.parentPropInTemplate);
    console.log(this._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    this.childInputBindingUsedInTemplate =
      this.childInputBindingUsedInTemplate + "-pOI";
    this.childInputBindingNotUsedInTemplate =
      this.childInputBindingNotUsedInTemplate + "-pOI";
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    // Shared prop listener
    this._sharedService.onSharedPropChange(value => {
      // this.childInputBindingUsedInTemplate = value;
      this.sharedServiceProp = value;
    });

    // Child to parent listener
    this._sharedService.onChildToParentPropChange(value => {
      this.sharedChildToParentProp = value;
    });

    this.sharedServiceProp = this.sharedServiceProp + "-pOI";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedParentToChildProp = this.sharedParentToChildProp + "-pOI";
    this._sharedService.parentToChildProp = this.sharedParentToChildProp;
    console.log(this.sharedServiceProp);
    console.log(this.sharedParentToChildProp);
    console.log(this.sharedChildToParentProp); // undefined
    console.log("\n");
  }

  ngDoCheck(): void {
    console.warn("(5) Parent ngDoCheck");

    // Parent
    console.log("- Parent:");
    this.parentPropInTemplate = this.parentPropInTemplate + "-pDC";
    this._parentPropNotInTemplate = this._parentPropNotInTemplate + "-pDC";
    console.log(this.parentPropInTemplate);
    console.log(this._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    this.childInputBindingUsedInTemplate =
      this.childInputBindingUsedInTemplate + "-pDC";
    this.childInputBindingNotUsedInTemplate =
      this.childInputBindingNotUsedInTemplate + "-pDC";
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-pDC";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedParentToChildProp = this.sharedParentToChildProp + "-pDC";
    this._sharedService.parentToChildProp = this.sharedParentToChildProp;
    console.log(this.sharedServiceProp);
    console.log(this.sharedParentToChildProp);
    console.log(this.sharedChildToParentProp); // undefined
    console.log("\n");
  }

  ngAfterContentInit(): void {
    console.warn("(6) Parent ngAfterContentInit");

    // Parent
    console.log("- Parent:");
    this.parentPropInTemplate = this.parentPropInTemplate + "-pACI";
    this._parentPropNotInTemplate = this._parentPropNotInTemplate + "-pACI";
    console.log(this.parentPropInTemplate);
    console.log(this._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    this.childInputBindingUsedInTemplate =
      this.childInputBindingUsedInTemplate + "-pACI";
    this.childInputBindingNotUsedInTemplate =
      this.childInputBindingNotUsedInTemplate + "-pACI";
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-pACI";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedParentToChildProp = this.sharedParentToChildProp + "-pACI";
    this._sharedService.parentToChildProp = this.sharedParentToChildProp;
    console.log(this.sharedServiceProp);
    console.log(this.sharedParentToChildProp);
    console.log(this.sharedChildToParentProp); // undefined
    console.log("\n");
  }

  ngAfterContentChecked(): void {
    console.warn("(7) Parent ngAfterContentChecked");

    // Parent
    console.log("- Parent:");
    this.parentPropInTemplate = this.parentPropInTemplate + "-pACC";
    this._parentPropNotInTemplate = this._parentPropNotInTemplate + "-pACC";
    console.log(this.parentPropInTemplate);
    console.log(this._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    this.childInputBindingUsedInTemplate =
      this.childInputBindingUsedInTemplate + "-pACC";
    this.childInputBindingNotUsedInTemplate =
      this.childInputBindingNotUsedInTemplate + "-pACC";
    console.log(this.childInputBindingUsedInTemplate);
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");
    this.sharedServiceProp = this.sharedServiceProp + "-pACC";
    this._sharedService.sharedProp = this.sharedServiceProp;
    this.sharedParentToChildProp = this.sharedParentToChildProp + "-pACC";
    this._sharedService.parentToChildProp = this.sharedParentToChildProp;
    console.log(this.sharedServiceProp);
    console.log(this.sharedParentToChildProp);
    console.log(this.sharedChildToParentProp); // undefined
    console.log("\n");
  }

  ngAfterViewInit(): void {
    console.warn("(15) Parent ngAfterViewInit");

    // Parent
    console.log("- Parent:");
    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous
    // value: 'parentPropInTemplate-a2345'. Current value: 'parentPropInTemplate-a23456'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines`
    );
    // this.parentPropInTemplate = this.parentPropInTemplate + '-pAVI';
    this._parentPropNotInTemplate = this._parentPropNotInTemplate + "-pAVI";
    console.log(this.parentPropInTemplate);
    console.log(this._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'childInputBindingUsedInTemplate: childInputBindingUsedInTemplate-2345'. Current value: 'childInputBindingUsedInTemplate: childInputBindingUsedInTemplate-2345-pAVI'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines`
    );
    // this.childInputBindingUsedInTemplate = this.childInputBindingUsedInTemplate + '-pAVI';
    console.log(this.childInputBindingUsedInTemplate);

    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'childInputBindingNotUsedInTemplate: childInputBindingNotUsedInTemplate-2345'. Current value: 'childInputBindingNotUsedInTemplate: childInputBindingNotUsedInTemplate-2345-pAVI'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines`
    );
    // this.childInputBindingNotUsedInTemplate = this.childInputBindingNotUsedInTemplate + '-pAVI';
    console.log(this.childInputBindingNotUsedInTemplate);

    // Shared service
    console.log("\n- Shared service:");

    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'null: undefined-cC-cOC-cOI-cDC-cACI-cACC'. Current value: 'null: undefined-cC-cOC-cOI-cDC-cACI-cACC-pAVI'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines`
    );
    // this.sharedServiceProp = this.sharedServiceProp + '-pAVI';
    // this._sharedService.sharedProp = this.sharedServiceProp;
    console.log(this.sharedServiceProp);

    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'null: parentToChildProp-pC-pOI-pDC-pACI-pACC'. Current value: 'null: parentToChildProp-pC-pOI-pDC-pACI-pACC-pAVI'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines`
    );
    // this.sharedParentToChildProp = this.sharedParentToChildProp + '-pAVI';
    // this._sharedService.parentToChildProp = this.sharedParentToChildProp;
    console.log(this.sharedParentToChildProp);

    console.log(this.sharedChildToParentProp); // sharedChildToParentProp-cC-cOC-cOI-cDC-cACI-cACC
    console.log("\n");
  }

  ngAfterViewChecked(): void {
    console.warn("(16) Parent ngAfterViewChecked");

    // Parent
    console.log("- Parent:");
    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked. Previous
    // value: 'parentPropInTemplate-a2345'. Current value: 'parentPropInTemplate-a23457'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines`
    );
    // this.parentPropInTemplate = this.parentPropInTemplate + '7';
    this._parentPropNotInTemplate = this._parentPropNotInTemplate + "7";
    console.log(this.parentPropInTemplate);
    console.log(this._parentPropNotInTemplate);

    // Child input binding
    console.log("\n- Child input binding:");
    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'childInputBindingUsedInTemplate: childInputBindingUsedInTemplate-2345'. Current value: 'childInputBindingUsedInTemplate: childInputBindingUsedInTemplate-23457'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines`
    );
    // this.childInputBindingUsedInTemplate = this.childInputBindingUsedInTemplate + '7';
    console.log(this.childInputBindingUsedInTemplate);

    // ERROR Error: ExpressionChangedAfterItHasBeenCheckedError: Expression has changed after it was checked.
    // Previous value: 'childInputBindingNotUsedInTemplate: childInputBindingNotUsedInTemplate-2345'. Current value: 'childInputBindingNotUsedInTemplate: childInputBindingNotUsedInTemplate-23457'.
    console.log(
      `ERROR: ExpressionChangedAfterItHasBeenCheckedError will be thrown if uncomment lines`
    );
    // this.childInputBindingNotUsedInTemplate = this.childInputBindingNotUsedInTemplate + '7';
    console.log(this.childInputBindingNotUsedInTemplate);

    console.log("\n");
  }

  /**
   * When this is called:
   * 1. Parent DoCheck
   * 2. Parent AfterContentChecked
   * 3.   Child DoCheck
   * 4.   Child AfterContentChecked
   * 5.   Child AfterViewChecked
   * 6. Parent AfterViewChecked.
   */
  onChildPropEmitter(childPropToParent: string) {
    console.warn("Parent onChildPropEmitter");
    console.log(childPropToParent);
    // this.childOutputValue = childPropToParent;
  }
}
