# Angular Architecture Bottom Up

[ChangeDetectorRef](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/change_detection/change_detector_ref.ts)
````typescript
export abstract class ChangeDetectorRef {
  abstract markForCheck(): void;
  abstract detach(): void;
  abstract detectChanges(): void;
  abstract checkNoChanges(): void;
  abstract reattach(): void;
}
````

[ViewRef](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/linker/view_ref.ts#L16)
````typescript
export abstract class ViewRef extends ChangeDetectorRef {
  abstract destroy(): void;
  abstract get destroyed(): boolean;
  abstract onDestroy(callback: Function): any;
}
````

[EmbeddedViewRef](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/linker/view_ref.ts#L81)
- Represents an Angular View.
- A View is a fundamental building block of the application UI. It is the smallest grouping of
  Elements which are created and destroyed together.
  
- Properties of elements in a View can change, but the structure (number and order) of elements in
  a View cannot. Changing the structure of Elements can only be done by inserting, moving or
  removing nested Views via a {@link ViewContainerRef}. Each View can contain many View Containers.
````typescript
export abstract class EmbeddedViewRef<C> extends ViewRef {
  abstract get context(): C;
  abstract get rootNodes(): any[];
}
````

[IntervalViewRef](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/linker/view_ref.ts#L87)
````typescript
export interface InternalViewRef extends ViewRef {
  detachFromAppRef(): void;
  attachToAppRef(appRef: ApplicationRef): void;
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

[ViewData](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L301)
- There is a direct relationship between a view and a component — one view is associated with one component and vice verse.
- A view holds a reference to the associated component class instance in the component property.
- All operations like property checks and DOM updates are performed on views, hence it’s more technically correct to state that angular is a tree of views, while a component can be described as a higher level concept of a view.
- Each view has a link to its child views through nodes property and hence can perform actions on child views.
- Each view has a state, which plays very important role because based on its value Angular decides whether to run change detection for the view and all its children or skip it.
- By default, all views are initialized with ChecksEnabled unless ChangeDetectionStrategy.OnPush is used. More on that later. 
````typescript
export interface ViewData {
  def: ViewDefinition;
  root: RootData;
  renderer: Renderer2;
  parentNodeDef: NodeDef|null;
  parent: ViewData|null;
  viewContainerParent: ViewData|null;
  component: any;
  context: any;
  nodes: {[key: number]: NodeData};
  state: ViewState;
  oldValues: any[];
  disposables: DisposableFn[]|null;
}
````

[ViewDefinition](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L21)
````typescript
export interface ViewDefinition {
  factory: ViewDefinitionFactory|null;
  flags: ViewFlags;
  updateDirectives: ViewUpdateFn;
  updateRenderer: ViewUpdateFn;
  handleEvent: ViewHandleEventFn;
  nodes: NodeDef[];
  nodeFlags: NodeFlags;
  rootNodeFlags: NodeFlags;
  lastRenderRootNode: NodeDef|null;
  bindingCount: number;
  outputCount: number;
  nodeMatchedQueries: number;
````

[ViewState](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L325)
````typescript
export const enum ViewState {
  FirstCheck = 1 << 0,
  ChecksEnabled = 1 << 1,
  Errored = 1 << 2,
  Destroyed = 1 << 3
}
````

[ViewFlags](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L80)
````typescript
export const enum ViewFlags {
  None = 0,
  OnPush = 1 << 1,
}
````

[ElementData](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L366)
````typescript
export interface ElementData {
  renderElement: any;
  componentView: ViewData;
  viewContainer: ViewContainerData|null;
  template: TemplateData;
}
````

[ViewContainerData](https://github.com/angular/angular/blob/6b79ab5abec8b5a4b43d563ce65f032990b3e3bc/packages/core/src/view/types.ts#L373)
````typescript
export interface ViewContainerData extends ViewContainerRef { _embeddedViews: ViewData[]; }
````
