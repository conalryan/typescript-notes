# Simple Interpolation Stack Trace

app.component.html
````html
<h1>Angular Change Detection {{interpolatedValue}}</h1>
````
app.component.ngfactory.js:
- The function _ck(_v, 1, 0, currVal_0); is the debugCheckRenderNodeFn core.js 11095
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");

var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Change Detection ", ""]))
    ],
    null,
    function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.interpolatedValue;
      _ck(_v, 1, 0, currVal_0);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0,RenderType_AppComponent)),
      i1.ɵdid(1, 114688, null, 0, i2.AppComponent, [], null, null)
    ],
    function (_ck, _v) {
      _ck(_v, 1, 0);
    },
    null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````
- Commented Code
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");

var styles_AppComponent = [i0.styles];

/**
 * export declare function createRendererType2(
 *  values: {
 *   styles: (string | any[])[];
 *   encapsulation: ViewEncapsulation;
 *   data: { [kind: string]: any[]; };
 *  }
 * ): RendererType2;
 *
 * export declare enum ViewEncapsulation {
 *  // Emulate `Native` scoping of styles by adding an attribute containing surrogate id to the Host
 *  // Element and pre-processing the style.
 *  // This is the default option.
 *  Emulated = 0,
 *  // @deprecated
 *  Native = 1,
 *  None = 2,
 *  ShadowDom = 3
 * }
 * @type {RendererType2}
 */
var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  /**
   * viewDef(
   *  flags: ViewFlags,
   *  nodes: NodeDef[],
   *  updateDirectives?: null | ViewUpdateFn,
   *  updateRenderer?: null | ViewUpdateFn
   * ): ViewDefinition;
   */
  return i1.ɵvid(
    0,
    [
      /**
       * export interface NodeDef {
       *  flags: NodeFlags;
       *  nodeIndex: number;
       *  checkIndex: number;
       *  parent: NodeDef | null;
       *  renderParent: NodeDef | null;
       *  ngContentIndex: number | null;
       *  childCount: number;
       *  childFlags: NodeFlags;
       *  directChildFlags: NodeFlags;
       *  bindingIndex: number;
       *  bindings: BindingDef[];
       *  bindingFlags: BindingFlags;
       *  outputIndex: number;
       *  outputs: OutputDef[];
       *  references: { [refId: string]: QueryValueType; };
       *  matchedQueries: { [queryId: number]: QueryValueType; };
       *  matchedQueryIds: number;
       *  childMatchedQueries: number;
       *  element: ElementDef | null;
       *  provider: ProviderDef | null;
       *  text: TextDef | null;
       *  query: QueryDef | null;
       *  ngContent: NgContentDef | null;
       * }
       */
      (_l()(), // I believe this is for the NodeLogger
          /**
           * elementDef(
           *  checkIndex: number,
           *  flags: NodeFlags,
           *  matchedQueriesDsl: null | [string | number, QueryValueType][],
           *  ngContentIndex: null | number,
           *  childCount: number,
           *  namespaceAndName: string | null,
           *  fixedAttrs?: null | [string, string][],
           *  bindings?: null | [BindingFlags, string, string | SecurityContext | null][],
           *  outputs?: null | ([string, string])[],
           *  handleEvent?: null | ElementHandleEventFn,
           *  componentView?: null | ViewDefinitionFactory,
           *  componentRendererType?: RendererType2 | null
           * ): NodeDef;
           */
          i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)
      ),
      (_l()(),
          /**
           * textDef(
           *  checkIndex: number,
           *  ngContentIndex: number | null,
           *  staticText: string[]
           * ): NodeDef;
           */
          i1.ɵted(1, null, ["Angular Change Detection ", ""])
      )
    ],
    null,
    /**
     * export interface ViewUpdateFn {
     *  (check: NodeCheckFn, view: ViewData): void;
     * }
     * @param _ck: NodeCheckFn
     * @param _v: ViewData
     * @return void
     */
    function (_ck, _v) {
      var _co = _v.component;
      var currVal_1 = _co.interpolatedValue;
      /**
       * export interface NodeCheckFn {
       *  (view: ViewData, nodeIndex: number, argStyle: ArgumentType.Dynamic, values: any[]): any;
       *  (view: ViewData, nodeIndex: number, argStyle: ArgumentType.Inline, v0?: any, v1?: any, v2?: any, v3?: any,
       * v4?: any, v5?: any, v6?: any, v7?: any, v8?: any, v9?: any): any;
       * }
       *
       * @param view: ViewData
       * export interface ViewData {
       *  def: ViewDefinition;
       *  root: RootData;
       *  renderer: Renderer2;
       *  parentNodeDef: NodeDef | null;
       *  parent: ViewData | null;
       *  viewContainerParent: ViewData | null;
       *  component: any;
       *  context: any;
       *  nodes: { [key: number]: NodeData; };
       *  state: ViewState;
       *  oldValues: any[];
       *  disposables: DisposableFn[] | null;
       *  initIndex: number;
       * }
       * @param nodeIndex: number (This is the same as checkIndex: number from NodeDef)
       * @param argStyle: ArgumentType (ArgumentType.Inline = 0, ArgumentType.Dynamic = 1)
       * @param values v0 - v9: any | any[]
       * @return any
       */
      _ck(_v, 1, 0, currVal_1);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  /**
   * viewDef(
   *  flags: ViewFlags,
   *  nodes: NodeDef[],
   *  updateDirectives?: null | ViewUpdateFn,
   *  updateRenderer?: null | ViewUpdateFn
   * ): ViewDefinition;
   */
  return i1.ɵvid(0,
    [
      (_l()(),
          /**
           * elementDef(
           *  checkIndex: number,
           *  flags: NodeFlags,
           *  matchedQueriesDsl: null | [string | number, QueryValueType][],
           *  ngContentIndex: null | number,
           *  childCount: number,
           *  namespaceAndName: string | null,
           *  fixedAttrs?: null | [string, string][],
           *  bindings?: null | [BindingFlags, string, string | SecurityContext | null][],
           *  outputs?: null | ([string, string])[],
           *  handleEvent?: null | ElementHandleEventFn,
           *  componentView?: null | ViewDefinitionFactory,
           *  componentRendererType?: RendererType2 | null
           * ): NodeDef;
           */
          i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)
      ),
      /**
       * export declare function directiveDef(
       *  checkIndex: number,
       *  flags: NodeFlags,
       *  matchedQueries: null | [string | number, QueryValueType][],
       *  childCount: number,
       *  ctor: any,
       *  deps: ([DepFlags, any] | any)[],
       *  props?: null | { [name: string]: [number, string]; },
       *  outputs?: null | { [name: string]: string; }
       * ): NodeDef;
       */
      i1.ɵdid(1, 114688, null, 0, i2.AppComponent, [], null, null)
    ],
    /**
     * export interface ViewUpdateFn {
     *  (check: NodeCheckFn, view: ViewData): void;
     * }
     */
    function (_ck, _v) {
      /**
       * export interface NodeCheckFn {
       *  (view: ViewData, nodeIndex: number, argStyle: ArgumentType.Dynamic, values: any[]): any;
       *  (view: ViewData, nodeIndex: number, argStyle: ArgumentType.Inline, v0?: any, v1?: any, v2?: any, v3?: any,
       * v4?: any, v5?: any, v6?: any, v7?: any, v8?: any, v9?: any): any;
       * }
       */
      _ck(_v, 1, 0);
    },
    null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

/**
 * export declare function createComponentFactory(
 *  selector: string,
 *  componentType: Type<any>,
 *  viewDefFactory: ViewDefinitionFactory,
 *  inputs: { [propName: string]: string; } | null,
 *  outputs: { [propName: string]: string; },
 *  ngContentSelectors: string[]
 * ): ComponentFactory<any>;
 *
 * @type {ComponentFactory<any>}
 */
var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

## How will Angular run change detection?
````javascript
function ApplicationRef(_zone, _console, _injector, _exceptionHandler, _componentFactoryResolver, _initStatus) {
  ...
  this._zone.onMicrotaskEmpty.subscribe({ next: function () { _this._zone.run(function () { _this.tick(); }); } };
  ...
}
````
````javascript
ApplicationRef.prototype.tick = function () {
  ...
  this._views.forEach(function (view) { return view.detectChanges(); });
  ...
}
````
````javascript
ViewRef_.prototype.detectChanges = function () {
  ...
  Services.checkAndUpdateView(this._view);
  ...
};
````
- The first time we run through checkAndUpdateView, the view is app-root.
````javascript
function checkAndUpdateView(view) {
  ...
  execComponentViewsAction(view, ViewAction.CheckAndUpdate);
  ...
}
````
````javascript
function execComponentViewsAction(view, action) {
  ...
  callViewAction(asElementData(view, i).componentView, action);
  ...
}
````
````javascript
function callViewAction(view, action) {
  var viewState = view.state;
  switch (action) {
    ...
    case ViewAction.CheckAndUpdate:
      ...
      checkAndUpdateView(view);
      ...
      break;
    ...
  }
}
````
- Second going through this function but now with AppComponent
````javascript
function checkAndUpdateView(view) {
  ...
  Services.updateRenderer(view, 0 /* CheckAndUpdate */);
  ...
}
````
````javascript
function debugUpdateRenderer(view, checkType) {
  ...
  debugSetCurrentNode(view, nextRenderNodeWithBinding(view, 0));
  return view.def.updateRenderer(debugCheckRenderNodeFn, view);
  // This is calling app.component.ngfacotory.js _ck(_v, 1, 0, currVal_0)
  function debugCheckRenderNodeFn(view, nodeIndex, argStyle) {
   ...
   debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
   ...
  }
}
````
- This is where we will loop through the bindings.
- Ex. first binding is for the style, then we'll come back to this style after that has run for the interpolation.
````javascript
function nextRenderNodeWithBinding(view, nodeIndex) {
  for (var i = nodeIndex; i < view.def.nodes.length; i++) {
    var nodeDef = view.def.nodes[i];
    if ((nodeDef.flags & 3 /* CatRenderNode */) && nodeDef.bindings && nodeDef.bindings.length) {
      return i;
    }
  }
  return null;
}
````
````javascript
function debugCheckAndUpdateNode(view, nodeDef, argStyle, givenValues) {
  var changed = checkAndUpdateNode.apply(void 0, __spread([view, nodeDef, argStyle], givenValues));
  if (changed) {
    var values = argStyle === 1 /* Dynamic */ ? givenValues[0] : givenValues;
    if (nodeDef.flags & 16384 /* TypeDirective */) {
      var bindingValues = {};
      for (var i = 0; i < nodeDef.bindings.length; i++) {
        var binding = nodeDef.bindings[i];
        var value = values[i];
        if (binding.flags & 8 /* TypeProperty */) {
          bindingValues[normalizeDebugBindingName(binding.nonMinifiedName)] =
            normalizeDebugBindingValue(value);
        }
      }
      var elDef = nodeDef.parent;
      var el = asElementData(view, elDef.nodeIndex).renderElement;
      if (!elDef.element.name) {
        // a comment.
        view.renderer.setValue(el, "bindings=" + JSON.stringify(bindingValues, null, 2));
      }
      else {
        // a regular element.
        for (var attr in bindingValues) {
          var value = bindingValues[attr];
          if (value != null) {
            view.renderer.setAttribute(el, attr, value);
          }
          else {
            view.renderer.removeAttribute(el, attr);
          }
        }
      }
    }
  }
}
````
````javascript
function checkAndUpdateNode(view, nodeDef, argStyle, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
  if (argStyle === 0 /* Inline */) {
    return checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
  }
  else {
    return checkAndUpdateNodeDynamic(view, nodeDef, v0);
  }
}
````
````javascript
function checkAndUpdateNodeInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
  switch (nodeDef.flags & 201347067 /* Types */) {
    case 1 /* TypeElement */:
      return checkAndUpdateElementInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    case 2 /* TypeText */:
      return checkAndUpdateTextInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    case 16384 /* TypeDirective */:
      return checkAndUpdateDirectiveInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    case 32 /* TypePureArray */:
    case 64 /* TypePureObject */:
    case 128 /* TypePurePipe */:
      return checkAndUpdatePureExpressionInline(view, nodeDef, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9);
    default:
      throw 'unreachable';
  }
}
````
````javascript
function checkAndUpdateTextInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
  var changed = false;
  var bindings = def.bindings;
  var bindLen = bindings.length;
  if (bindLen > 0 && checkAndUpdateBinding(view, def, 0, v0))
    changed = true;
  if (bindLen > 1 && checkAndUpdateBinding(view, def, 1, v1))
    changed = true;
  if (bindLen > 2 && checkAndUpdateBinding(view, def, 2, v2))
    changed = true;
  if (bindLen > 3 && checkAndUpdateBinding(view, def, 3, v3))
    changed = true;
  if (bindLen > 4 && checkAndUpdateBinding(view, def, 4, v4))
    changed = true;
  if (bindLen > 5 && checkAndUpdateBinding(view, def, 5, v5))
    changed = true;
  if (bindLen > 6 && checkAndUpdateBinding(view, def, 6, v6))
    changed = true;
  if (bindLen > 7 && checkAndUpdateBinding(view, def, 7, v7))
    changed = true;
  if (bindLen > 8 && checkAndUpdateBinding(view, def, 8, v8))
    changed = true;
  if (bindLen > 9 && checkAndUpdateBinding(view, def, 9, v9))
    changed = true;
  if (changed) {
    var value = def.text.prefix;
    if (bindLen > 0)
      // Ex. value is Angular Change Detection
      value += _addInterpolationPart(v0, bindings[0]);
      // Ex. value is now Angular Change Detection Hello from Component
    if (bindLen > 1)
      value += _addInterpolationPart(v1, bindings[1]);
    if (bindLen > 2)
      value += _addInterpolationPart(v2, bindings[2]);
    if (bindLen > 3)
      value += _addInterpolationPart(v3, bindings[3]);
    if (bindLen > 4)
      value += _addInterpolationPart(v4, bindings[4]);
    if (bindLen > 5)
      value += _addInterpolationPart(v5, bindings[5]);
    if (bindLen > 6)
      value += _addInterpolationPart(v6, bindings[6]);
    if (bindLen > 7)
      value += _addInterpolationPart(v7, bindings[7]);
    if (bindLen > 8)
      value += _addInterpolationPart(v8, bindings[8]);
    if (bindLen > 9)
      value += _addInterpolationPart(v9, bindings[9]);
    var renderNode$$1 = asTextData(view, def.nodeIndex).renderText;
    view.renderer.setValue(renderNode$$1, value);
    // Now you can see Angular Change Detection Hello from Component on the screen.
  }
  return changed;
}
````
````javascript
function _addInterpolationPart(value, binding) {
  var valueStr = value != null ? value.toString() : '';
  return valueStr + binding.suffix;
}
````
- After this function runs you can see the change on the screen ex. Angular Change Detection Hello from Component
````javascript
DefaultDomRenderer2.prototype.setValue = function (node, value) { node.nodeValue = value; };
````
