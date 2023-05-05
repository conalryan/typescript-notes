// import {EmbeddedViewRef} from '@angular/core/src/linker/view_ref';
import {ApplicationRef} from '@angular/core/src/application_ref';
import {Injector} from '@angular/core/src/di/injector';
import {ComponentRef} from '@angular/core/src/linker/component_factory';
import {NgModuleRef} from '@angular/core/src/linker/ng_module_factory';
import {ComponentFactory, Renderer2} from '@angular/core';
import {
  CheckType,
  DisposableFn, NodeData, NodeDef, NodeFlags, RootData, rootRenderNodes, Services,
  ViewDefinition, ViewFlags
} from '@angular/core/src/view';
import {markParentViewsForCheck} from '@angular/core/src/view/util';
import {renderDetachView} from '@angular/core/src/view/view_attach';
import {callLifecycleHooksChildrenFirst} from '@angular/core/src/view/provider';
import {ChangeDetectorRef} from '@angular/core/src/change_detection/change_detection';
import {ViewRef} from '@angular/core/src/linker/view_ref';
import {ElementRef} from '@angular/core/src/linker/element_ref';
import {Type} from '@angular/core/src/type';

/*

export declare abstract class ChangeDetectorRef {
  abstract markForCheck(): void;
  abstract detach(): void;
  abstract detectChanges(): void;
  abstract checkNoChanges(): void;
  abstract reattach(): void;
}


export declare abstract class ViewRef extends ChangeDetectorRef {
  readonly abstract destroyed: boolean;
  abstract destroy(): void;
  abstract onDestroy(callback: Function): any;
}


export declare abstract class EmbeddedViewRef<C> extends ViewRef {
  readonly abstract context: C;
  readonly abstract rootNodes: any[];
}

// ================================= DOM Abstractions ============================================
export declare class ElementRef {
  nativeElement: any;
  constructor(nativeElement: any);
}

export declare abstract class TemplateRef<C> {
  readonly abstract elementRef: ElementRef;
  abstract createEmbeddedView(context: C): EmbeddedViewRef<C>;
}


// ===============================================================================================my-internals.ts
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


export const enum ViewState {
  FirstCheck = 1 << 0,
  ChecksEnabled = 1 << 1,
  Errored = 1 << 2,
  Destroyed = 1 << 3
}


========================================================================================================================


export interface InternalViewRef extends ViewRef {
  detachFromAppRef(): void;
  attachToAppRef(appRef: ApplicationRef): void;
}


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


export function checkAndUpdateView(view: ViewData) {
  Services.updateDirectives(view, CheckType.CheckAndUpdate);
  execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
  execQueriesAction(
    view, NodeFlags.TypeContentQuery, NodeFlags.DynamicQuery, CheckType.CheckAndUpdate);

  callLifecycleHooksChildrenFirst(
    view, NodeFlags.AfterContentChecked |
    (view.state & ViewState.FirstCheck ? NodeFlags.AfterContentInit : 0));

  Services.updateRenderer(view, CheckType.CheckAndUpdate);

  execComponentViewsAction(view, ViewAction.CheckAndUpdate);
  execQueriesAction(
    view, NodeFlags.TypeViewQuery, NodeFlags.DynamicQuery, CheckType.CheckAndUpdate);

  callLifecycleHooksChildrenFirst(
    view, NodeFlags.AfterViewChecked |
    (view.state & ViewState.FirstCheck ? NodeFlags.AfterViewInit : 0));

  if (view.def.flags & ViewFlags.OnPush) {
    view.state &= ~ViewState.ChecksEnabled;
  }
  view.state &= ~ViewState.FirstCheck;
}


export declare abstract class ViewContainerRef {
  readonly abstract element: ElementRef;
  readonly abstract injector: Injector;
  readonly abstract parentInjector: Injector;
  readonly abstract length: number;
  abstract clear(): void;
  abstract get(index: number): ViewRef | null;
  abstract createEmbeddedView<C>(templateRef: TemplateRef<C>, context?: C, index?: number): EmbeddedViewRef<C>;
  abstract createComponent<C>(componentFactory: ComponentFactory<C>, index?: number, injector?: Injector,
                              projectableNodes?: any[][], ngModule?: NgModuleRef<any>): ComponentRef<C>;
  abstract insert(viewRef: ViewRef, index?: number): ViewRef;
  abstract move(viewRef: ViewRef, currentIndex: number): ViewRef;
  abstract indexOf(viewRef: ViewRef): number;
  abstract remove(index?: number): void;
  abstract detach(index?: number): ViewRef | null;
}


export declare abstract class ComponentRef<C> {
  readonly abstract location: ElementRef;
  readonly abstract injector: Injector;
  readonly abstract instance: C;
  readonly abstract hostView: ViewRef;
  readonly abstract changeDetectorRef: ChangeDetectorRef;
  readonly abstract componentType: Type<any>;
  abstract destroy(): void;
  abstract onDestroy(callback: Function): void;
}
*/
