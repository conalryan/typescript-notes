import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { Model } from "../model/model";

/**
 * Ref: https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f
 * - View: {@link ViewData} Low-level abstraction.
 * - One component to one view. {@link ViewData#component} holds reference to the given component.
 * - Angular is a tree of views that closely resembles the DOM.
 *
 * - A View is a fundamental building block of the application UI.
 * - It is the smallest grouping of Elements which are created and destroyed together.
 * - Properties of elements in a View can change, but the structure (number and order) of elements in a View cannot.
 * - Changing the structure of Elements can only be done by inserting, moving or removing nested Views via a
 *   ViewContainerRef.
 * - Each View can contain many View Containers.
 */
@Component({
  selector: "app-change-detection",
  template: `
    <p>
      change-detection works!<br/>
      But has this changed ? -> {{changed}}
    </p>
    <!--<app-child-a></app-child-a>-->
    <!--<app-child-b></app-child-b>-->
    <!--<app-child-c></app-child-c>-->
    <button type="button"
            class="btn btn-primary"
            id="increment"
            name="increment"
            (click)="incrementCounter()">
      Increment Counter
    </button>

    <p>{{counter}}</p>
  `,
  /**
   * View State: {@link ViewData#state:ViewState}
   * Angular decides whether to run change detection for the view and all its children or skip it.
   * There are many possible states but the following ones are relevant in the context of this article:
   * - FirstCheck
   * - ChecksEnabled
   * - Errored
   * - Destroyed
   *
   * Change detection is skipped for the view and its child views if:
   *  - ChecksEnabled is false
   *  - View is in the Errored or Destroyed state.
   *  - By default, all views are initialized with ChecksEnabled unless ChangeDetectionStrategy.OnPush is used.
   */
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangeDetectionContainer
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  changed: boolean;
  counter = 0;
  primitive: number = 0;
  objProp: Model = new Model('default');

  /**
   * ViewRef: {@link _ViewRef}
   * https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/refs.ts#L219
   * - Encapsulates the underlying component view.
   * - Has an aptly named method detectChanges.
   * - When an asynchronous event takes place, Angular triggers change detection on its top-most ViewRef,
   *   which after running change detection for itself runs change detection for its child views.
   * - This viewRef is what you can inject into a component constructor using ChangeDetectorRef token:
   *
   * @param _hostElement
   * @param _cd
   */
  constructor(
    private _hostElement: ElementRef,
    private _cd: ChangeDetectorRef
  ) {
    console.warn("Parent constructor() { ChangeDetectorRef }");
    /*
      STACK TRACE:
      my-change-detection.component.ts:60 Parent constructor() { ChangeDetectorRef }
      MyChangeDetectionComponent	@	my-change-detection.component.ts:60
      createClass	@	core.js:10148
      createDirectiveInstance	@	core.js:10033
      createViewNodes	@	core.js:11255
      createRootView	@	core.js:11169
      callWithDebugContext	@	core.js:12204
      debugCreateRootView	@	core.js:11691
      push../node_modules/@angular/core/fesm5/core.js.ComponentFactory_.create	@	core.js:9513
      push../node_modules/@angular/core/fesm5/core.js.ComponentFactoryBoundToModule.create	@	core.js:3489
      push../node_modules/@angular/core/fesm5/core.js.ViewContainerRef_.createComponent	@	core.js:9623
      push../node_modules/@angular/router/fesm5/router.js.RouterOutlet.activateWith	@	router.js:4960
      push../node_modules/@angular/router/fesm5/router.js.ActivateRoutes.activateRoutes	@	router.js:4273
      (anonymous)	@	router.js:4225
      push../node_modules/@angular/router/fesm5/router.js.ActivateRoutes.activateChildRoutes	@	router.js:4224
      push../node_modules/@angular/router/fesm5/router.js.ActivateRoutes.activate	@	router.js:4146
      (anonymous)	@	router.js:4085
     */
    console.log(_hostElement);

    console.log(_cd);
    /*
    ViewRef_ {_view: {…}, _viewContainerRef: null, _appRef: null}
      context: MyChangeDetectionComponent
      destroyed: false
      rootNodes: Array(8)
      _appRef: null
      _view: {def: {…}, parent: {…}, viewContainerParent: null, parentNodeDef: {…}, context: MyChangeDetectionComponent, …}
      _viewContainerRef: null
      __proto__: Object
     */

    this.changed = false;
    // setTimeout(() => {
    //   /**
    //    * Detaching the ref means the interpolation will not be updated in the DOM (in this case after the time out).
    //    */
    //   this._cd.detach();
    //   this.changed = true;
    // }, 2000);
  }

  /**
   * THIS WILL NOT BE CALLED IN THERE ARE NO INPUTS TO THIS COMPONENT
   * @param changes
   */
  ngOnChanges(changes: SimpleChanges): void {
    console.warn("Parent ngOnChanges() { } ");
  }

  ngOnInit() {
    console.warn("Parent ngOnInit() { } ");
    /*
    Stack Trace:
    Parent ngOnInit() { }
    MyChangeDetectionComponent.ngOnInit	@	my-change-detection.component.ts:89
    checkAndUpdateDirectiveInline	@	core.js:12095
      // directive.ngOnInit();
    checkAndUpdateNodeInline	@	core.js:13598
      // return checkAndUpdateDirectiveInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    checkAndUpdateNode	@	core.js:13541
      // return checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    debugCheckAndUpdateNode	@	core.js:14413
      // bindingValues[normalizeDebugBindingName(((binding.nonMinifiedName)))] = normalizeDebugBindingValue(value);
      // view.renderer.setValue(el, "bindings=" + JSON.stringify(bindingValues, null, 2));
      // view.renderer.setAttribute(el, attr, value);
      // view.renderer.removeAttribute(el, attr);
    debugCheckDirectivesFn	@	core.js:14354
      // debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
    (anonymous)	@	MyChangeDetectionCom…gfactory.js? [sm]:1
    debugUpdateDirectives	@	core.js:14339
      // view.def.updateDirectives(debugCheckDirectivesFn, view)
    checkAndUpdateView	@	core.js:13508
      // Services.updateDirectives(view, 0);
    callViewAction	@	core.js:13858
      // checkAndUpdateView(view);
    execEmbeddedViewsAction	@	core.js:13816
      // callViewAction(embeddedViews[k], action);
    checkAndUpdateView	@	core.js:13509
      // The line after this (Services.updateDirectives(view, 0);)
      // execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
    callViewAction	@	core.js:13858
      // checkAndUpdateView(view);
    execComponentViewsAction	@	core.js:13790
      // callViewAction(asElementData(view, i).componentView, action);
    checkAndUpdateView	@	core.js:13514
      // The line after this (Services.updateRenderer(view, 0);)
      // execComponentViewsAction(view, ViewAction.CheckAndUpdate);
    callWithDebugContext	@	core.js:14740
      // Only called for debug?
    debugCheckAndUpdateView	@	core.js:14277
      // Only called for debug?
    ViewRef_.detectChanges	@	core.js:11300
      Services.checkAndUpdateView(this._view);
    (anonymous)	@	core.js:5786
    ApplicationRef.tick	@	core.js:5786
     */

    // function checkAndUpdateView(view) {
    //    if (view.state & 1 /* BeforeFirstCheck */) {
    //   view.state &= ~1 /* BeforeFirstCheck */;
    //   view.state |= 2 /* FirstCheck */;
    // }
    // else {
    //   view.state &= ~2 /* FirstCheck */;
    // }
    // shiftInitState(view, 0 /* InitState_BeforeInit */, 256 /* InitState_CallingOnInit */);
    // markProjectedViewsForCheck(view);
    // Services.updateDirectives(view, 0 /* CheckAndUpdate */);
    // execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
    // execQueriesAction(view, 67108864 /* TypeContentQuery */, 536870912 /* DynamicQuery */, 0 /* CheckAndUpdate */);
    // var callInit = shiftInitState(view, 256 /* InitState_CallingOnInit */, 512 /* InitState_CallingAfterContentInit */);
    // callLifecycleHooksChildrenFirst(view, 2097152 /* AfterContentChecked */ | (callInit ? 1048576 /* AfterContentInit */ : 0));
    // Services.updateRenderer(view, 0 /* CheckAndUpdate */);
    // execComponentViewsAction(view, ViewAction.CheckAndUpdate);
    // execQueriesAction(view, 134217728 /* TypeViewQuery */, 536870912 /* DynamicQuery */, 0 /* CheckAndUpdate */);
    // callInit = shiftInitState(view, 512 /* InitState_CallingAfterContentInit */, 768 /* InitState_CallingAfterViewInit */);
    // callLifecycleHooksChildrenFirst(view, 8388608 /* AfterViewChecked */ | (callInit ? 4194304 /* AfterViewInit */ : 0));
    // if (view.def.flags & 2 /* OnPush */) {
    //   view.state &= ~8 /* ChecksEnabled */;
    // }
    // view.state &= ~(64 /* CheckProjectedViews */ | 32 /* CheckProjectedView */);
    // shiftInitState(view, 768 /* InitState_CallingAfterViewInit */, 1024 /* InitState_AfterInit */);
    // }
  }

  ngDoCheck(): void {
    console.warn("Parent ngDoCheck() { } ");
    /*
    STACK TRACE:
    my-change-detection.component.ts:229 Parent ngDoCheck() { }
    push../src/app/change-detection/my-change-detection.component.ts.MyChangeDetectionComponent.ngDoCheck	@	my-change-detection.component.ts:229
    checkAndUpdateDirectiveInline	@	core.js:10100
    checkAndUpdateNodeInline	@	core.js:11363
    checkAndUpdateNode	@	core.js:11325
    debugCheckAndUpdateNode	@	core.js:11962
    debugCheckDirectivesFn	@	core.js:11922
    (anonymous)	@	MyChangeDetectionCom…gfactory.js? [sm]:1
    debugUpdateDirectives	@	core.js:11914
    checkAndUpdateView	@	core.js:11307
    callViewAction	@	core.js:11548
    execEmbeddedViewsAction	@	core.js:11511
    checkAndUpdateView	@	core.js:11308
    callViewAction	@	core.js:11548
    execComponentViewsAction	@	core.js:11490
    checkAndUpdateView	@	core.js:11313
    callWithDebugContext	@	core.js:12204
    debugCheckAndUpdateView	@	core.js:11882
    push../node_modules/@angular/core/fesm5/core.js.ViewRef_.detectChanges	@	core.js:9692
    (anonymous)	@	core.js:5086
    push../node_modules/@angular/core/fesm5/core.js.ApplicationRef.tick	@	core.js:5086
   */
  }

  ngAfterContentInit(): void {
    console.warn("Parent ngAfterContentInit() { } ");
    /*
    my-change-detection.component.ts:218 Parent ngAfterContentInit() { }
    push../src/app/change-detection/my-change-detection.component.ts.MyChangeDetectionComponent.ngAfterContentInit	@	my-change-detection.component.ts:218
    callProviderLifecycles	@	core.js:10407
    callElementProvidersLifecycles	@	core.js:10388
    callLifecycleHooksChildrenFirst	@	core.js:10378
    checkAndUpdateView	@	core.js:11311
    callViewAction	@	core.js:11548
    execEmbeddedViewsAction	@	core.js:11511
    checkAndUpdateView	@	core.js:11308
    callViewAction	@	core.js:11548
    execComponentViewsAction	@	core.js:11490
    checkAndUpdateView	@	core.js:11313
    callWithDebugContext	@	core.js:12204
    debugCheckAndUpdateView	@	core.js:11882
    push../node_modules/@angular/core/fesm5/core.js.ViewRef_.detectChanges	@	core.js:9692
    (anonymous)	@	core.js:5086
    push../node_modules/@angular/core/fesm5/core.js.ApplicationRef.tick	@	core.js:5086
     */
  }

  ngAfterContentChecked(): void {
    console.warn("Parent ngAfterContentChecked() { } ");
    /*
    Parent ngAfterContentChecked() { }
    push../src/app/change-detection/my-change-detection.component.ts.MyChangeDetectionComponent.ngAfterContentChecked	@	my-change-detection.component.ts:222
    callProviderLifecycles	@	core.js:10410
    callElementProvidersLifecycles	@	core.js:10388
    callLifecycleHooksChildrenFirst	@	core.js:10378
    checkAndUpdateView	@	core.js:11311
    callViewAction	@	core.js:11548
    execEmbeddedViewsAction	@	core.js:11511
    checkAndUpdateView	@	core.js:11308
    callViewAction	@	core.js:11548
    execComponentViewsAction	@	core.js:11490
    checkAndUpdateView	@	core.js:11313
    callWithDebugContext	@	core.js:12204
    debugCheckAndUpdateView	@	core.js:11882
    push../node_modules/@angular/core/fesm5/core.js.ViewRef_.detectChanges	@	core.js:9692
    (anonymous)	@	core.js:5086
    push../node_modules/@angular/core/fesm5/core.js.ApplicationRef.tick	@	core.js:5086
     */
  }

  ngAfterViewInit(): void {
    console.warn("Parent ngAfterViewInit() { } ");
    /*
    Parent ngAfterViewInit() { }
    push../src/app/change-detection/my-change-detection.component.ts.MyChangeDetectionComponent.ngAfterViewInit	@	my-change-detection.component.ts:226
    callProviderLifecycles	@	core.js:10414
    callElementProvidersLifecycles	@	core.js:10388
    callLifecycleHooksChildrenFirst	@	core.js:10378
    checkAndUpdateView	@	core.js:11316
    callViewAction	@	core.js:11548
    execEmbeddedViewsAction	@	core.js:11511
    checkAndUpdateView	@	core.js:11308
    callViewAction	@	core.js:11548
    execComponentViewsAction	@	core.js:11490
    checkAndUpdateView	@	core.js:11313
    callWithDebugContext	@	core.js:12204
    debugCheckAndUpdateView	@	core.js:11882
    push../node_modules/@angular/core/fesm5/core.js.ViewRef_.detectChanges	@	core.js:9692
    (anonymous)	@	core.js:5086
    push../node_modules/@angular/core/fesm5/core.js.ApplicationRef.tick	@	core.js:5086
     */
  }

  ngAfterViewChecked(): void {
    console.warn("Parent ngAfterViewChecked() { } ");
    /*
    Parent ngAfterViewChecked() { }
    push../src/app/change-detection/my-change-detection.component.ts.MyChangeDetectionComponent.ngAfterViewChecked	@	my-change-detection.component.ts:230
    callProviderLifecycles	@	core.js:10417
    callElementProvidersLifecycles	@	core.js:10388
    callLifecycleHooksChildrenFirst	@	core.js:10378
    checkAndUpdateView	@	core.js:11316
    callViewAction	@	core.js:11548
    execEmbeddedViewsAction	@	core.js:11511
    checkAndUpdateView	@	core.js:11308
    callViewAction	@	core.js:11548
    execComponentViewsAction	@	core.js:11490
    checkAndUpdateView	@	core.js:11313
    callWithDebugContext	@	core.js:12204
    debugCheckAndUpdateView	@	core.js:11882
    push../node_modules/@angular/core/fesm5/core.js.ViewRef_.detectChanges	@	core.js:9692
    (anonymous)	@	core.js:5086
    push../node_modules/@angular/core/fesm5/core.js.ApplicationRef.tick	@	core.js:5086
     */
  }

  incrementCounter() {
    this.counter++;
    console.warn("incrementCounter");
    /*
    incrementCounter
    1
    Parent ngDoCheck()
    Parent ngAfterContentChecked()
    Parent ngAfterViewChecked()
     */
    console.log(this.counter);
  }
}
