# Change Detection

[ApplicationRef](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/application_ref.ts#L351)
````typescript
export declare class ApplicationRef {
  abstract bootstrap<C>(componentFactory: ComponentFactory<C>|Type<C>): ComponentRef<C>;
  abstract tick(): void;
  abstract get componentTypes(): Type<any>[];
  abstract get components(): ComponentRef<any>[];
  abstract attachView(view: ViewRef): void;
  abstract detachView(view: ViewRef): void;
  abstract get viewCount(): number;
  abstract get isStable(): Observable<boolean>;
}
````

[ApplicationRef_](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/application_ref.ts#L417)
- When an asynchronous event takes place, Angular [triggers change detection](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/application_ref.ts#L439) on its top-most ViewRef ([ApplicationRef.tick()](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/application_ref.ts#L552.)), which after running change detection for itself runs change detection for its child views.
````typescript
@Injectable()
export class ApplicationRef_ extends ApplicationRef {

  static _tickScope: WtfScopeFn = wtfCreateScope('ApplicationRef#tick()');
  private _bootstrapListeners: ((compRef: ComponentRef<any>) => void)[] = [];
  private _rootComponents: ComponentRef<any>[] = [];
  private _rootComponentTypes: Type<any>[] = [];
  private _views: InternalViewRef[] = [];
  private _runningTick: boolean = false;
  private _enforceNoNewChanges: boolean = false;
  private _stable = true;

  constructor(
    private _zone: NgZone, private _console: Console, private _injector: Injector,
    private _exceptionHandler: ErrorHandler,
    private _componentFactoryResolver: ComponentFactoryResolver,
    private _initStatus: ApplicationInitStatus) {
    super();
    this._enforceNoNewChanges = isDevMode();

    this._zone.onMicrotaskEmpty.subscribe(
      {
        next: () => {
          this._zone.run(() => {
            this.tick();
          });
        }
      });

    const isCurrentlyStable = new Observable<boolean>((observer: Observer<boolean>) => {});
    const isStable = new Observable<boolean>((observer: Observer<boolean>) => {});});
    this._isStable = merge(isCurrentlyStable, share.call(isStable));
  }

  private _isStable: Observable<boolean>;
  get isStable(): Observable<boolean> {}
  get viewCount() {}
  get componentTypes(): Type<any>[] {}
  get components(): ComponentRef<any>[] {}
  attachView(viewRef: ViewRef): void {}
  detachView(viewRef: ViewRef): void {}
  bootstrap<C>(componentOrFactory: ComponentFactory<C> | Type<C>): ComponentRef<C> {}

  tick(): void {
    if (this._runningTick) {
      throw new Error('ApplicationRef.tick is called recursively');
    }

    const scope = ApplicationRef_._tickScope();
    try {
      this._runningTick = true;
      this._views.forEach((view) => view.detectChanges());
      if (this._enforceNoNewChanges) {
        this._views.forEach((view) => view.checkNoChanges());
      }
    } finally {
      this._runningTick = false;
      wtfLeave(scope);
    }
  }

  ngOnDestroy() {}
  private _loadComponent(componentRef: ComponentRef<any>): void {}
  private _unloadComponent(componentRef: ComponentRef<any>): void {}
}
````

[ViewRef_](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/refs.ts#L219)
- Used to manipulate views.
- It encapsulates the underlying component view in _view: ViewData property and runs change detection on the view via detectChanges method. 
- When an asynchronous event takes place, Angular triggers change detection on its top-most [ViewRef](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/application_ref.ts#L552.), which after running change detection for itself runs change detection for its child views.
- This viewRef is what you can inject into a component constructor using ChangeDetectorRef token:
  ````typescript
  export class AppComponent {  
    constructor(cd: ChangeDetectorRef) { ... }
  }
  ````

````typescript
export class ViewRef_ implements EmbeddedViewRef<any>, InternalViewRef {
  _view: ViewData;
  private _viewContainerRef: ViewContainerRef|null;
  private _appRef: ApplicationRef|null;

  constructor(_view: ViewData) {
    this._view = _view;
    this._viewContainerRef = null;
    this._appRef = null;
  }

  // From ChangeDetectorRef
  markForCheck(): void { markParentViewsForCheck(this._view); }
  detach(): void { this._view.state &= ~ViewState.ChecksEnabled; }
  detectChanges(): void { Services.checkAndUpdateView(this._view); }
  checkNoChanges(): void { Services.checkNoChangesView(this._view); }
  reattach(): void { this._view.state |= ViewState.ChecksEnabled; }
  
  // From ViewRef
  destroy() {}
  get destroyed(): boolean { return (this._view.state & ViewState.Destroyed) !== 0; }
  onDestroy(callback: Function) {}
  
  // From EmbeddedViewRef
  get context() { return this._view.context; }
  get rootNodes(): any[] { return rootRenderNodes(this._view); }
  
  // From InternalViewRef
  detachFromAppRef() {}
  attachToAppRef(appRef: ApplicationRef) {}
  
  attachToViewContainerRef(vcRef: ViewContainerRef) {}
}
````

[checkAndUpdateView](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/view.ts#L325)
- The main logic responsible for running change detection for a view resides in checkAndUpdateView function.
- Most of its functionality performs operations on child component views.
- This function is called recursively for each component starting from the host component.
- It means that a child component becomes parent component on the next call as a recursive tree unfolds.
````typescript
export function checkAndUpdateView(view: ViewData) {
  Services.updateDirectives(view, CheckType.CheckAndUpdate);
  execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
  execQueriesAction(view, NodeFlags.TypeContentQuery, NodeFlags.DynamicQuery, CheckType.CheckAndUpdate);
  callLifecycleHooksChildrenFirst(view, NodeFlags.AfterContentChecked | (view.state & ViewState.FirstCheck ? NodeFlags.AfterContentInit : 0));
  Services.updateRenderer(view, CheckType.CheckAndUpdate);
  execComponentViewsAction(view, ViewAction.CheckAndUpdate);
  execQueriesAction(view, NodeFlags.TypeViewQuery, NodeFlags.DynamicQuery, CheckType.CheckAndUpdate);
  callLifecycleHooksChildrenFirst(view, NodeFlags.AfterViewChecked | (view.state & ViewState.FirstCheck ? NodeFlags.AfterViewInit : 0));
  if (view.def.flags & ViewFlags.OnPush) {
    view.state &= ~ViewState.ChecksEnabled;
  }
  view.state &= ~ViewState.FirstCheck;
}
````

[checkAndUpdateDirectiveInline](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/provider.ts#L154)
- [Checks](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/util.ts#L81) and [updates](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/provider.ts#L436) input properties on a child component/directive instance
````typescript
export function checkAndUpdateDirectiveInline(view: ViewData, def: NodeDef, v0: any, v1: any, v2: any, v3: any, v4: any, v5: any, v6: any,v7: any, v8: any, v9: any): boolean {
  const providerData = asProviderData(view, def.index);
  const directive = providerData.instance;
  let changed = false;
  let changes: SimpleChanges = undefined !;
  const bindLen = def.bindings.length;
  if (bindLen > 0 && checkBinding(view, def, 0, v0)) {changed = true; changes = updateProp(view, providerData, def, 0, v0, changes);}
  if (bindLen > 1 && checkBinding(view, def, 1, v1)) {changed = true; changes = updateProp(view, providerData, def, 1, v1, changes);}
  if (bindLen > 2 && checkBinding(view, def, 2, v2)) {changed = true; changes = updateProp(view, providerData, def, 2, v2, changes);}
  if (bindLen > 3 && checkBinding(view, def, 3, v3)) {changed = true; changes = updateProp(view, providerData, def, 3, v3, changes);}
  if (bindLen > 4 && checkBinding(view, def, 4, v4)) {changed = true; changes = updateProp(view, providerData, def, 4, v4, changes);}
  if (bindLen > 5 && checkBinding(view, def, 5, v5)) {changed = true; changes = updateProp(view, providerData, def, 5, v5, changes);}
  if (bindLen > 6 && checkBinding(view, def, 6, v6)) {changed = true; changes = updateProp(view, providerData, def, 6, v6, changes);}
  if (bindLen > 7 && checkBinding(view, def, 7, v7)) {changed = true; changes = updateProp(view, providerData, def, 7, v7, changes);}
  if (bindLen > 8 && checkBinding(view, def, 8, v8)) {changed = true; changes = updateProp(view, providerData, def, 8, v8, changes);}
  if (bindLen > 9 && checkBinding(view, def, 9, v9)) {changed = true; changes = updateProp(view, providerData, def, 9, v9, changes);}
  if (changes) {
    directive.ngOnChanges(changes);
  }
  if ((view.state & ViewState.FirstCheck) && (def.flags & NodeFlags.OnInit)) {
    directive.ngOnInit();
  }
  if (def.flags & NodeFlags.DoCheck) {
    directive.ngDoCheck();
  }
  return changed;
}
````

[checkBinding](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/util.ts#L81)
````typescript
export function checkBinding(view: ViewData, def: NodeDef, bindingIdx: number, value: any): boolean {
  const oldValues = view.oldValues;
  if ((view.state & ViewState.FirstCheck) || !looseIdentical(oldValues[def.bindingIndex + bindingIdx], value)) {
    return true;
  }
  return false;
}
````

[looseIdentical](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/util.ts#L50)
- What the hell is typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b); ?
  When will that ever be true?  Why not just to || false;
````typescript
export function looseIdentical(a: any, b: any): boolean {
  return a === b || typeof a === 'number' && typeof b === 'number' && isNaN(a) && isNaN(b);
}
````

[updateProp](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/provider.ts#L436)
````typescript
function updateProp(view: ViewData, providerData: ProviderData, def: NodeDef, bindingIdx: number, value: any, changes: SimpleChanges): SimpleChanges {
  if (def.flags & NodeFlags.Component) {
    const compView = asElementData(view, def.parent !.index).componentView;
    if (compView.def.flags & ViewFlags.OnPush) {
      compView.state |= ViewState.ChecksEnabled;
    }
  }
  const binding = def.bindings[bindingIdx];
  const propName = binding.name !;
  // Note: This is still safe with Closure Compiler as
  // the user passed in the property name as an object has to `providerDef`,
  // so Closure Compiler will have renamed the property correctly already.
  providerData.instance[propName] = value;
  if (def.flags & NodeFlags.OnChanges) {
    changes = changes || {};
    let oldValue = view.oldValues[def.bindingIndex + bindingIdx];
    if (oldValue instanceof WrappedValue) {
      oldValue = oldValue.wrapped;
    }
    const binding = def.bindings[bindingIdx];
    changes[binding.nonMinifiedName !] = new SimpleChange(oldValue, value, (view.state & ViewState.FirstCheck) !== 0);
  }
  view.oldValues[def.bindingIndex + bindingIdx] = value;
  return changes;
}
````

[execEmbeddedViewsAction](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/view.ts#L519)
````typescript
function execEmbeddedViewsAction(view: ViewData, action: ViewAction) {
  const def = view.def;
  if (!(def.nodeFlags & NodeFlags.EmbeddedViews)) {
    return;
  }
  for (let i = 0; i < def.nodes.length; i++) {
    const nodeDef = def.nodes[i];
    if (nodeDef.flags & NodeFlags.EmbeddedViews) {
      // a leaf
      const embeddedViews = asElementData(view, i).viewContainer !._embeddedViews;
      for (let k = 0; k < embeddedViews.length; k++) {
        callViewAction(embeddedViews[k], action);
      }
    } else if ((nodeDef.childFlags & NodeFlags.EmbeddedViews) === 0) {
      // a parent with leafs
      // no child is a component,
      // then skip the children
      i += nodeDef.childCount;
    }
  }
}
````
