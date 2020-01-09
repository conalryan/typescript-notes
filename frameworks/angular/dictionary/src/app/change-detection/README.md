Change Detection
--------------------------------------------------------------------------------------------------
https://blog.angularindepth.com/everything-you-need-to-know-about-change-detection-in-angular-8006c51d206f

https://blog.angularindepth.com/everything-you-need-to-know-about-the-expressionchangedafterithasbeencheckederror-error-e3fd9ce7dbb4

### Lifecycle Hooks
- constructor
- OnChanges:
  - Track parent component bound properties we can now use OnChanges life cycle hook.
- OnInit:
  - Watch third-party widgets outside Angular ecosystem and run change detection manually.
- DoCheck:
  - Track self-component properties and calculate computed properties.
  - Since this hook is triggered before Angular process properties changes on the current component, we can do whatever we need to get correctly reflected changes in UI.
- AfterContentInit
- AfterContentChecked
- AfterViewInit
- AfterViewChecked
- OnDestroy

### View as a core concept
- Angular application is a tree of components.
- However, under the hood angular uses a low-level abstraction called [view](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L301).

````typescript
export interface ViewData {
  def: ViewDefinition;
  root: RootData;
  renderer: Renderer2;
  // index of component provider / anchor.
  parentNodeDef: NodeDef|null;
  parent: ViewData|null;
  viewContainerParent: ViewData|null;
  component: any;
  context: any;
  // Attention: Never loop over this, as this will
  // create a polymorphic usage site.
  // Instead: Always loop over ViewDefinition.nodes,
  // and call the right accessor (e.g. `elementData`) based on
  // the NodeType.
  nodes: {[key: number]: NodeData};
  state: ViewState;
  oldValues: any[];
  disposables: DisposableFn[]|null;
}
````

- One view is associated with one component and vice verse.
- View holds a reference to the associated component class instance in the component property. 
- All operations like property checks and DOM updates are performed on views.
- Angular is a tree of views.
- Component is a higher level concept of a view.

- From [source](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/linker/view_ref.ts#L31):
  - A View is a fundamental building block of the application UI.
  - It is the smallest grouping of Elements which are created and destroyed together.
  - Properties of elements in a View can change, but the structure (number and order) of elements in a View cannot.
  - Changing the structure of Elements can only be done by inserting, moving or removing nested Views via a **ViewContainerRef**.
  - Each View can contain many View Containers.

- Angular has a bunch of high-level concepts to manipulate the views (e.g. [ViewRef](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/refs.ts#L219)).

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
  get rootNodes(): any[] { return rootRenderNodes(this._view); }
  get context() { return this._view.context; }
  get destroyed(): boolean { return (this._view.state & ViewState.Destroyed) !== 0; }
  markForCheck(): void { markParentViewsForCheck(this._view); }
  detach(): void { this._view.state &= ~ViewState.ChecksEnabled; }
  detectChanges(): void { Services.checkAndUpdateView(this._view); }
  checkNoChanges(): void { Services.checkNoChangesView(this._view); }
  reattach(): void { this._view.state |= ViewState.ChecksEnabled; }
  onDestroy(callback: Function) {
    if (!this._view.disposables) {
      this._view.disposables = [];
    }
    this._view.disposables.push(<any>callback);
  }
  destroy() {
    if (this._appRef) {
      this._appRef.detachView(this);
    } else if (this._viewContainerRef) {
      this._viewContainerRef.detach(this._viewContainerRef.indexOf(this));
    }
    Services.destroyView(this._view);
  }
  detachFromAppRef() {
    this._appRef = null;
    renderDetachView(this._view);
    Services.dirtyParentQueries(this._view);
  }
  attachToAppRef(appRef: ApplicationRef) {
    if (this._viewContainerRef) {
      throw new Error('This view is already attached to a ViewContainer!');
    }
    this._appRef = appRef;
  }
  attachToViewContainerRef(vcRef: ViewContainerRef) {
    if (this._appRef) {
      throw new Error('This view is already attached directly to the ApplicationRef!');
    }
    this._viewContainerRef = vcRef;
  }
}
````

- It encapsulates the underlying component view and has an aptly named **method** **detectChanges**.
- When an asynchronous event takes place, Angular triggers change detection on its top-most **ViewRef**,
  which after running change detection for itself runs change detection for its child views.
- This viewRef is what you can inject into a component constructor using **ChangeDetectorRef** token:
````typescript
export class AppComponent {
    constructor(cd: ChangeDetectorRef) { ... }
````

### View Definition
- [ViewDefinition](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L21)

````typescript
export interface ViewDefinition {
  factory: ViewDefinitionFactory|null;
  flags: ViewFlags;
  updateDirectives: ViewUpdateFn;
  updateRenderer: ViewUpdateFn;
  handleEvent: ViewHandleEventFn;
  /**
   * Order: Depth first.
   * Especially providers are before elements / anchors.
   */
  nodes: NodeDef[];
  /** aggregated NodeFlags for all nodes **/
  nodeFlags: NodeFlags;
  rootNodeFlags: NodeFlags;
  lastRenderRootNode: NodeDef|null;
  bindingCount: number;
  outputCount: number;
  /**
   * Binary or of all query ids that are matched by one of the nodes.
   * This includes query ids from templates as well.
   * Used as a bloom filter.
   */
  nodeMatchedQueries: number;
}
````

- Fundamental building block of the application UI. 
- It is the smallest grouping of Elements which are created and destroyed together.
- Properties of elements in a View can change.
- Structure (number and order) of elements in a View cannot change.
- Changing the structure of Elements can only be done by inserting, moving or removing nested Views via a **ViewContainerRef**.
- Each View can contain many View Containers.
- There’s no separate object (**ChangeDetectorRef**) for change detection and View is what change detection runs on.
- Each view has a link to its child views through **nodes** property and hence can perform actions on child views.

### View state
- [ViewState](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L317)

````typescript
/**
 * Bitmask of states
 */
export const enum ViewState {
  FirstCheck = 1 << 0,
  ChecksEnabled = 1 << 1,
  Errored = 1 << 2,
  Destroyed = 1 << 3
}
````

- Each view has a state.
- Decides whether to run change detection for the view and all its children or skip it. There are many possible states:
  - FirstCheck
  - ChecksEnabled
  - Errored
  - Destroyed
- Change detection is skipped for the view and its child views if ChecksEnabled is false or view is in the Errored or Destroyed state.
- By default, all views are initialized with ChecksEnabled unless **ChangeDetectionStrategy.OnPush** is used. 
- The states can be combined, for example, a view can have both FirstCheck and ChecksEnabled flags set.

### Example Components A > B > C
- **A**:
- AfterContentInit
- AfterContentChecked
- Update bindings
  - **B**:
  - AfterContentInit
  - AfterContentChecked
  - Update bindings
    - **C**:
    - AfterContentInit
    - AfterContentChecked
    - Update bindings
    - AfterViewInit
    - AfterViewChecked
  - **B**:
  - AfterViewInit
  - AfterViewChecked
- **A**:
- AfterViewInit
- AfterViewChecked

### oldValues
- After each operation Angular remembers what values it used to perform an operation.
- They are stored in oldValues property of the component view.
