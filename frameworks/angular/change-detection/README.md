# Angular Change Detection

## Generate App with Angular-CLI

```typescript
ng new angular-change-detection --style scss
```

## Git Setup
1. Remove Angular CLI .git

````bash
ls -a
rm -rf .git
````

2. Initialize new Git Repo
````bash
git init
````

3. Initial comit
````bash
git add .
git commit -m "init"
git remote add origin https://github.com/conalryan/angular-change-detection.git
git push -u origin master
````

## source-map-explorer
- Install it by running:

````bash
npm i -g source-map-explorer
````

## Build project

````bash
ng build
````

## Look inside bundles

````bash
source-map-explorer dist/angular-change-detection/vendor.js
````

## Compiler

- We can see that the “compiler” module accounts for nearly 50% of the bundle size — that is about 1MB (or 320kb when minified) that goes down the wire for every client.
- To remove the complier run:

````bash
ng build --prod
````

- Now compiler is gone from bundle

## AoT Ahead of Time Compilation

- AoT runs the compile step during the build process instead of inside the browser, so when you build your project for production, the compiler can disappear completely from the output, saving precious CPU cycles when the page loads in the user’s browser.

## Dom and Browser

### AngularJS

- AngularJS the creation of the DOM was delegated to the browser, which parsed your HTML and created the DOM tree (that’s its job, after all).
- AngularJS traverses the DOM elements, figure out the directives and text binding expressions and replace them with the actual data https://github.com/angular/angular.js/blob/e65928eecb3443943e3f9431e394e9bc59787952/src/ng/compile.js#L2124.
- This approach introduced several problems:
  1. Browsers can be inconsistent. Different browsers sometimes parse the same HTML input into different DOM structure, and Angular has to account for that. 
  2. Browsers are not very good at dealing with errors — they will often try to cover up for the error by automatically closing elements or moving them around, and even if they do spit an error, they don’t tell line numbers. This makes debugging problems much more challenging, usually leading to elimination until we find the error.
  3. We need a browser just for parsing our templates and rendering them into HTML that can be served to clients and displayed immediately (and also to search engines) — making server-side rendering a complicated and error prone setup
  4. HTML is case-insensitive when it comes to html tags names and attributes. Not only that, it does not preserve the original case, converting tag names to upper case, and attributes to lower case. You can observe this behavior by running:
    document.createElement('h1').nodeName
    And you see that you get uppercase “H1”. 
    This is what led AngularJS to use the famous kebab-case (i.e. ng-if, ng-model, etc.) in contrast with camelCase, which is a standard in the JavaScript worlds.
  5. Summary: So if you use the browser HTML parser, we get different results on different browsers, lacking error information, can’t get server rendering and lose attribute case.

### Angular
- The compiler actually replaces the browser and parses the HTML for you.
- Consistent parsing across all browsers, and also means it can be run in the server (since it’s just a piece of JS code that parses your templates), provide detailed error information, and preserve tag/attribute case.
- Get tooling support.

## Running the Compiler
- Without this command the dist folder would be:
  - dist
    - angular-change-detection
      - 3rdpartylicenses.txt
      - favicon.ico
      - index.html
      - main.js
      - polyfill.js
      - runtime.js
      - styles.js
      - vendor.js
````
Add to "scripts" in package.json

````json
"scripts": {
  ...,
  "compile": "ngc"
}
````

- Run

```bash
npm run compile
```

- Check your output (refer to tsconfig.json#outDir)

````json
"outDir": "./dist/out-tsc",
````

## Explore Compiled Javascript
- Go to output
example: dist/out-tsc/src/app/app.component.ngfactory.js

app.component.html:
````html
<h1>Angular Change Detection</h1>
````

app.component.ngfactory.js:
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
      (_l()(), i1.ɵted(-1, null, ["Angular Change Detection"]))
    ],
    null, null);
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0,
        RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;
var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````
    
- Methods starting with the letter ɵ (Greek Theta) followed by 3 other English letters (e.g. ɵvid), the letter ɵ is used by the Angular team to indicate that some method is private to the framework and must not be called directly by the user, as the API for these method is not guaranteed to stay stable between Angular versions.
- The reason for using 3 letter shortcut instead of full method name, is simply to save bytes in the final bundle size. But if you Ctrl+click one of those methods (in Visual Studio Code or WebStorm), you will actually see the full method name. For ɵvid, that would be viewDef, the function that defines a view.

### Change detection - Interpolation

- Add to app.component.html:
````html
<h1>Angular Change Detection {{interpolatedValue}}</h1>
````
- Add to app.component.ts
````typescript
interpolatedValue = 'Hello from Component';
````

- angularjs:
````javascript
$scope.$watch(
  function(scope) { 
    return scope.interpolatedValue;
  },
  function(newValue, oldValue) {
    if (newValue !== oldValue) {
      // Update the dom...
    }
  }
);
````

- angular ($scope.$watch is now updateRenderer?: null | ViewUpdateFn):
````javascript
function (_ck, _v) {
  var _co = _v.component;
  var currVal_0 = _co.interpolatedValue;
  _ck(_v, 1, 0, currVal_0);
});
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
      
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Change Detection ", ""]))
    ],
    null, 
    // aka/rip/~
    // $scope.$watch(
    //  function(scope) { 
    //    return scope.interpolatedValue;
    //  },
    //  function(newValue, oldValue) {
    //    if (newValue !== oldValue) {
    //      // Update the dom...
    //    }
    //  }
    // );
    function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.interpolatedValue;
      // aka debugCheckRenderNodeFn core.js:11095
      _ck(_v, 1, 0, currVal_0);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null,
    null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

#### Stack
- var ApplicationRef = /** @class */ (function () {})(); core.js 4448
````javascript
this._zone.onMicrotaskEmpty.subscribe({ next: function () { _this._zone.run(function () { _this.tick(); }); } });
````
- ApplicationRef.prototype.tick = function () {} core.js 4753
````javascript
this._views.forEach(function (view) { return view.detectChanges(); });
````
- ViewRef_.prototype.detectChanges = function () {} core.js 8839
```javascript
Services.checkAndUpdateView(this._view);
```
- function callWithDebugContext(action, fn, self, args) { } core.js 11345
````javascript
var result = fn.apply(self, args);
````
- function checkAndUpdateView(view) {} core.js 10448
````javascript
function checkAndUpdateView(view) {
  if (view.state & 1 /* BeforeFirstCheck */) {
    view.state &= ~1 /* BeforeFirstCheck */;
    view.state |= 2 /* FirstCheck */;
  }
  else {
    view.state &= ~2 /* FirstCheck */;
  }
  // Called before each cycle of a view's check to detect whether this is in the
  // initState for which we need to call ngOnInit, ngAfterContentInit or ngAfterViewInit
  // lifecycle methods. Returns true if this check cycle should call lifecycle
  // methods.
  shiftInitState(view, 0 /* InitState_BeforeInit */, 256 /* InitState_CallingOnInit */);
  
  // if (!(def.nodeFlags & 4 /* ProjectedTemplate */)) { return; }
  markProjectedViewsForCheck(view);
  
  // Called when view has updateDirectives function e.g. ngOnChanges, ngOnInit, ngDoCheck
  Services.updateDirectives(view, 0 /* CheckAndUpdate */);
  
  // if (!(def.nodeFlags & 16777216 /* EmbeddedViews */)) { return; }
  execEmbeddedViewsAction(view, ViewAction.CheckAndUpdate);
  
  // if (!(view.def.nodeFlags & queryFlags) || !(view.def.nodeFlags & staticDynamicQueryFlag)) { return; }
  execQueriesAction(view, 67108864 /* TypeContentQuery */, 536870912 /* DynamicQuery */, 0 /* CheckAndUpdate */);
  
  var callInit = shiftInitState(view, 256 /* InitState_CallingOnInit */, 512 /* InitState_CallingAfterContentInit */);
  
  // if (!(view.def.nodeFlags & lifecycles)) { return; }
  callLifecycleHooksChildrenFirst(view, 2097152 /* AfterContentChecked */ | (callInit ? 1048576 /* AfterContentInit */ : 0));
  
  // Called to update Element, Text, Directive, PureExpression
  Services.updateRenderer(view, 0 /* CheckAndUpdate */);
  
  // if (!(def.nodeFlags & 33554432 /* ComponentView */)) { return; }
  execComponentViewsAction(view, ViewAction.CheckAndUpdate);
  
  execQueriesAction(view, 134217728 /* TypeViewQuery */, 536870912 /* DynamicQuery */, 0 /* CheckAndUpdate */);
  
  callInit = shiftInitState(view, 512 /* InitState_CallingAfterContentInit */, 768 /* InitState_CallingAfterViewInit */);
  
  callLifecycleHooksChildrenFirst(view, 8388608 /* AfterViewChecked */ | (callInit ? 4194304 /* AfterViewInit */ : 0));
  
  if (view.def.flags & 2 /* OnPush */) {
    view.state &= ~8 /* ChecksEnabled */;
  }
  view.state &= ~(64 /* CheckProjectedViews */ | 32 /* CheckProjectedView */);
  shiftInitState(view, 768 /* InitState_CallingAfterViewInit */, 1024 /* InitState_AfterInit */);
}
````

##### Services.updateDirectives(view, 0 /* CheckAndUpdate */);
````javascript
function debugUpdateDirectives(view, checkType) {
  if (view.state & 128 /* Destroyed */) {
      throw viewDestroyedError(DebugAction[_currentAction]);
  }
  debugSetCurrentNode(view, nextDirectiveWithBinding(view, 0));
  return view.def.updateDirectives(debugCheckDirectivesFn, view);
  function debugCheckDirectivesFn(view, nodeIndex, argStyle) {
    var values = [];
    for (var _i = 3; _i < arguments.length; _i++) {
      values[_i - 3] = arguments[_i];
    }
    var nodeDef = view.def.nodes[nodeIndex];
    if (checkType === 0 /* CheckAndUpdate */) {
      debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
    }
    else {
      debugCheckNoChangesNode(view, nodeDef, argStyle, values);
    }
    if (nodeDef.flags & 16384 /* TypeDirective */) {
      debugSetCurrentNode(view, nextDirectiveWithBinding(view, nodeIndex));
    }
    return (nodeDef.flags & 224 /* CatPureExpression */) ?
      asPureExpressionData(view, nodeDef.nodeIndex).value :
      undefined;
  }
}
````

- function nextDirectiveWithBinding(view, nodeIndex) { } core.js 11171
  - I'm assuming this only returns i when there is a directive binding (i.e. [someProp]=someValue)
````javascript
function nextDirectiveWithBinding(view, nodeIndex) {
  for (var i = nodeIndex; i < view.def.nodes.length; i++) {
    var nodeDef = view.def.nodes[i];
    if (nodeDef.flags & 16384 /* TypeDirective */ && nodeDef.bindings && nodeDef.bindings.length) {
      return i;
    }
  }
  return null;
}
````

- function debugSetCurrentNode(view, nodeIndex) { } core.js 11048
````javascript
function debugSetCurrentNode(view, nodeIndex) {
  _currentView = view;
  _currentNodeIndex = nodeIndex;
}
````

##### Services.updateRenderer(view, 0 /* CheckAndUpdate */);
- function debugUpdateRenderer(view, checkType) { } core.js 11082
- function debugCheckRenderNodeFn is called to update interpolation (e.g. {{interpolatedValue}})
- This is the function we see in app.component.ngfactory.js
````javascript
function debugUpdateRenderer(view, checkType) {
  if (view.state & 128 /* Destroyed */) {
    throw viewDestroyedError(DebugAction[_currentAction]);
  }
  debugSetCurrentNode(view, nextRenderNodeWithBinding(view, 0));
  return view.def.updateRenderer(debugCheckRenderNodeFn, view);
  // This is calling app.component.ngfacotory.js _ck(_v, 1, 0, currVal_0)
  function debugCheckRenderNodeFn(view, nodeIndex, argStyle) {
    var values = [];
    for (var _i = 3; _i < arguments.length; _i++) {
      values[_i - 3] = arguments[_i];
    }
    var nodeDef = view.def.nodes[nodeIndex];
    if (checkType === 0 /* CheckAndUpdate */) {
      debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
    }
    else {
      debugCheckNoChangesNode(view, nodeDef, argStyle, values);
    }
    if (nodeDef.flags & 3 /* CatRenderNode */) {
      debugSetCurrentNode(view, nextRenderNodeWithBinding(view, nodeIndex));
    }
    return (nodeDef.flags & 224 /* CatPureExpression */) ?
      asPureExpressionData(view, nodeDef.nodeIndex).value :
      undefined;
  }
}
````

- function nextRenderNodeWithBinding(view, nodeIndex) { } core.js 11179
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

- function debugSetCurrentNode(view, nodeIndex) { } core.js 11048
````javascript
function debugSetCurrentNode(view, nodeIndex) {
  _currentView = view;
  _currentNodeIndex = nodeIndex;
}
````

- function debugCheckRenderNodeFn(view, nodeIndex, argStyle) { } core.js 11088
- This is the function see in app.component.ngfactory.js _ck(_v, 1, 0, currVal_0);
````javascript
function debugCheckRenderNodeFn(view, nodeIndex, argStyle) {
  var values = [];
  for (var _i = 3; _i < arguments.length; _i++) {
    values[_i - 3] = arguments[_i];
  }
  var nodeDef = view.def.nodes[nodeIndex];
  if (checkType === 0 /* CheckAndUpdate */) {
    debugCheckAndUpdateNode(view, nodeDef, argStyle, values);
  }
  else {
    debugCheckNoChangesNode(view, nodeDef, argStyle, values);
  }
  if (nodeDef.flags & 3 /* CatRenderNode */) {
    debugSetCurrentNode(view, nextRenderNodeWithBinding(view, nodeIndex));
  }
  return (nodeDef.flags & 224 /* CatPureExpression */) ?
    asPureExpressionData(view, nodeDef.nodeIndex).value :
    undefined;
}
````

- function debugCheckAndUpdateNode(view, nodeDef, argStyle, givenValues) { } core.js 11108
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
/////////////////////////////////////////////////////////////////////////////////////////////////

##### execComponentViewsAction(view, ViewAction.CheckAndUpdate);
- execComponentViewsAction() {} core.js 10632
````javascript
function execComponentViewsAction(view, action) {
  var def = view.def;
  if (!(def.nodeFlags & 33554432 /* ComponentView */)) {
    return;
  }
  for (var i = 0; i < def.nodes.length; i++) {
    var nodeDef = def.nodes[i];
    if (nodeDef.flags & 33554432 /* ComponentView */) {
      // a leaf
      callViewAction(asElementData(view, i).componentView, action);
    }
    else if ((nodeDef.childFlags & 33554432 /* ComponentView */) === 0) {
      // a parent with leafs
      // no child is a component,
      // then skip the children
      i += nodeDef.childCount;
    }
  }
}
````

- callViewAction() {} core.js 10674
````javascript
function callViewAction(view, action) {
  var viewState = view.state;
  switch (action) {
    case ViewAction.CheckNoChanges:
      if ((viewState & 128 /* Destroyed */) === 0) {
        if ((viewState & 12 /* CatDetectChanges */) === 12 /* CatDetectChanges */) {
          checkNoChangesView(view);
        }
        else if (viewState & 64 /* CheckProjectedViews */) {
          execProjectedViewsAction(view, ViewAction.CheckNoChangesProjectedViews);
        }
      }
      break;
    case ViewAction.CheckNoChangesProjectedViews:
      if ((viewState & 128 /* Destroyed */) === 0) {
        if (viewState & 32 /* CheckProjectedView */) {
          checkNoChangesView(view);
        }
        else if (viewState & 64 /* CheckProjectedViews */) {
          execProjectedViewsAction(view, action);
        }
      }
      break;
    case ViewAction.CheckAndUpdate:
      if ((viewState & 128 /* Destroyed */) === 0) {
        if ((viewState & 12 /* CatDetectChanges */) === 12 /* CatDetectChanges */) {
          checkAndUpdateView(view);
        }
        else if (viewState & 64 /* CheckProjectedViews */) {
          execProjectedViewsAction(view, ViewAction.CheckAndUpdateProjectedViews);
        }
      }
      break;
    case ViewAction.CheckAndUpdateProjectedViews:
      if ((viewState & 128 /* Destroyed */) === 0) {
        if (viewState & 32 /* CheckProjectedView */) {
          checkAndUpdateView(view);
        }
        else if (viewState & 64 /* CheckProjectedViews */) {
          execProjectedViewsAction(view, action);
        }
      }
      break;
    case ViewAction.Destroy:
      // Note: destroyView recurses over all views,
      // so we don't need to special case projected views here.
      destroyView(view);
      break;
    case ViewAction.CreateViewNodes:
      createViewNodes(view);
      break;
  }
}
````


#### Modified Interpolation


### Add Multiple Interpolations
- Add to app.component.html
````html
<h1>Angular Compiler Hi {{title}} {{subtitle}}</h1>
<p>Second line with title: {{title}}</p>
<span>Third line with subtitle: {{subtitle}}</span>
````

app.component.ngfactory.ts:
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
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""])),
      (_l()(), i1.ɵeld(2, 0, null, null, 1, "p", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(3, null, ["Second line with title: ", ""])),
      (_l()(), i1.ɵeld(4, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(5, null, ["Third line with subtitle: ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
      
      var currVal_2 = _co.title;
      _ck(_v, 3, 0, currVal_2);
      
      var currVal_3 = _co.subtitle;
      _ck(_v, 5, 0, currVal_3);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

### Add Button
- Add to app.component.html
````html
<button type="button"
        class="btn btn-primary"
        id="counter-increment"
        (click)="incrementCounter()">
  Increment counter
</button>
<span>Counter is: {{counter}}</span>
````

- Add to app.component.ts
````typescript
incrementCounter() {
  this.counter++;
}
````

app.component.ngfactory.js:
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  // evid = function viewDef(flags: ViewFlags, nodes: NodeDef[], updateDirectives?: null | ViewUpdateFn,
  // updateRenderer?: null | ViewUpdateFn): ViewDefinition;
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""])),
      (_l()(), i1.ɵeld(2, 0, null, null, 1, "p", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(3, null, ["Second line with title: ", ""])),
      (_l()(), i1.ɵeld(4, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(5, null, ["Third line with subtitle: ", ""])),
      (_l()(),
        // eeld = function elementDef(checkIndex: number, flags: NodeFlags, matchedQueriesDsl: null | [string | number,
        // QueryValueType][], ngContentIndex: null | number, childCount: number, namespaceAndName: string | null,
        // fixedAttrs?: null | [string, string][], bindings?: null | [BindingFlags, string, string | SecurityContext |
        // null][], outputs?: null | ([string, string])[], handleEvent?: null | ElementHandleEventFn, componentView?:
        // null | ViewDefinitionFactory, componentRendererType?: RendererType2 | null): NodeDef;
        i1.ɵeld(
          6,
          0,
          null,
          null,
          1,
          "button",
          [["class", "btn btn-primary"], ["id", "counter-increment"], ["type", "button"]],
          null,
          [[null, "click"]],
          function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (("click" === en)) {
              var pd_0 = (_co.incrementCounter() !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },
          null,
          null)
      ),
      (_l()(), i1.ɵted(-1, null, [" Increment counter\n"])),
      (_l()(), i1.ɵeld(8, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(9, null, ["Counter is: ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
      
      var currVal_2 = _co.title;
      _ck(_v, 3, 0, currVal_2);
      
      var currVal_3 = _co.subtitle;
      _ck(_v, 5, 0, currVal_3);
      
      var currVal_4 = _co.counter;
      _ck(_v, 9, 0, currVal_4);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0,
    RenderType_AppComponent)), i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)], null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

### Add Lifecycle Hook
- Add to app.component.ts
````typescript
ngOnInit() {
  this.title = 'ngOnInit was run!';
}
````

app.component.ngfactory.js
````javascript
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var styles_AppComponent = [i0.styles];

var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0, [(_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""])),
      (_l()(), i1.ɵeld(2, 0, null, null, 1, "p", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(3, null, ["Second line with title: ", ""])),
      (_l()(), i1.ɵeld(4, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(5, null, ["Third line with subtitle: ", ""])),
      (_l()(),
          i1.ɵeld(
            6,
            0,
            null,
            null,
            1,
            "button",
            [["class", "btn btn-primary"], ["id", "counter-increment"], ["type", "button"]],
            null,
            [[null, "click"]],
            function (_v, en, $event) {
              var ad = true;
              var _co = _v.component;
              if (("click" === en)) {
                var pd_0 = (_co.incrementCounter() !== false);
                ad = (pd_0 && ad);
              }
              return ad;
            },
            null,
            null)
      ),
      (_l()(), i1.ɵted(-1, null, [" Increment counter\n"])),
      (_l()(), i1.ɵeld(8, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(9, null, ["Counter is: ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
      
      var currVal_2 = _co.title;
      _ck(_v, 3, 0, currVal_2);
      
      var currVal_3 = _co.subtitle;
      _ck(_v, 5, 0, currVal_3);
      
      var currVal_4 = _co.counter;
      _ck(_v, 9, 0, currVal_4);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0,
        RenderType_AppComponent)),
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

- Add a console log

````javascript
console.log(i1.ɵvid(0, 
  [
    (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
    (_l()(), i1.ɵted(1, null, ["Hi, ", " !!"])),
    (_l()(), i1.ɵted(2, null, ["Hi, ", " !!"]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = (_co.title.toUpperCase());
      _ck(_v, 1, 0, currVal_0);
    
      var currVal_0 = (_co.title);
      _ck(_v, 2, 0, currVal_0);
    }));
````

### Add a service

app.module.ngfactory.js
````javascript
"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("@angular/core");
var i1 = require("./app.module");
var i2 = require("./app.component");
var i3 = require("./app.component.ngfactory");
var i4 = require("@angular/common");
var i5 = require("@angular/platform-browser");
var i6 = require("./emoji.service");
var AppModuleNgFactory = i0.ɵcmf(i1.AppModule, [i2.AppComponent], function (_l) {
  return i0.ɵmod(
    [
      i0.ɵmpd(512, i0.ComponentFactoryResolver, i0.ɵCodegenComponentFactoryResolver,
        [[8, [i3.AppComponentNgFactory]], [3, i0.ComponentFactoryResolver], i0.NgModuleRef]),
      i0.ɵmpd(5120, i0.LOCALE_ID, i0.ɵangular_packages_core_core_l, [[3, i0.LOCALE_ID]]),
      i0.ɵmpd(4608, i4.NgLocalization, i4.NgLocaleLocalization,
        [i0.LOCALE_ID, [2, i4.ɵangular_packages_common_common_a]]),
      i0.ɵmpd(4608, i0.Compiler, i0.Compiler, []),
      i0.ɵmpd(5120, i0.APP_ID, i0.ɵangular_packages_core_core_f, []),
      i0.ɵmpd(5120, i0.IterableDiffers, i0.ɵangular_packages_core_core_j, []),
      i0.ɵmpd(5120, i0.KeyValueDiffers, i0.ɵangular_packages_core_core_k, []),
      i0.ɵmpd(4608, i5.DomSanitizer, i5.ɵangular_packages_platform_browser_platform_browser_e, [i4.DOCUMENT]),
      i0.ɵmpd(6144, i0.Sanitizer, null, [i5.DomSanitizer]),
      i0.ɵmpd(4608, i5.HAMMER_GESTURE_CONFIG, i5.HammerGestureConfig, []),
      i0.ɵmpd(5120, i5.EVENT_MANAGER_PLUGINS, function (p0_0, p0_1, p1_0, p2_0, p2_1, p2_2) {
        return [new i5.ɵDomEventsPlugin(p0_0, p0_1), new i5.ɵKeyEventsPlugin(p1_0),
          new i5.ɵHammerGesturesPlugin(p2_0, p2_1, p2_2)];
      }, [i4.DOCUMENT, i0.NgZone, i4.DOCUMENT, i4.DOCUMENT, i5.HAMMER_GESTURE_CONFIG, i0.ɵConsole]),
      i0.ɵmpd(4608, i5.EventManager, i5.EventManager, [i5.EVENT_MANAGER_PLUGINS, i0.NgZone]),
      i0.ɵmpd(135680, i5.ɵDomSharedStylesHost, i5.ɵDomSharedStylesHost, [i4.DOCUMENT]),
      i0.ɵmpd(4608, i5.ɵDomRendererFactory2, i5.ɵDomRendererFactory2, [i5.EventManager, i5.ɵDomSharedStylesHost]),
      i0.ɵmpd(6144, i0.RendererFactory2, null, [i5.ɵDomRendererFactory2]),
      i0.ɵmpd(6144, i5.ɵSharedStylesHost, null, [i5.ɵDomSharedStylesHost]),
      i0.ɵmpd(4608, i0.Testability, i0.Testability, [i0.NgZone]),
      i0.ɵmpd(4608, i5.Meta, i5.Meta, [i4.DOCUMENT]),
      i0.ɵmpd(4608, i5.Title, i5.Title, [i4.DOCUMENT]),
      i0.ɵmpd(4608, i6.EmojiService, i6.EmojiService, []),
      i0.ɵmpd(1073742336, i4.CommonModule, i4.CommonModule, []),
      i0.ɵmpd(1024, i0.ErrorHandler, i5.ɵangular_packages_platform_browser_platform_browser_a, []),
      i0.ɵmpd(1024, i0.APP_INITIALIZER, function (p0_0) {
        return [i5.ɵangular_packages_platform_browser_platform_browser_h(p0_0)];
      }, [[2, i0.NgProbeToken]]),
      i0.ɵmpd(512, i0.ApplicationInitStatus, i0.ApplicationInitStatus, [[2, i0.APP_INITIALIZER]]),
      i0.ɵmpd(131584, i0.ApplicationRef, i0.ApplicationRef,
        [i0.NgZone, i0.ɵConsole, i0.Injector, i0.ErrorHandler, i0.ComponentFactoryResolver, i0.ApplicationInitStatus]),
      i0.ɵmpd(1073742336, i0.ApplicationModule, i0.ApplicationModule, [i0.ApplicationRef]),
      i0.ɵmpd(1073742336, i5.BrowserModule, i5.BrowserModule, [[3, i5.BrowserModule]]),
      i0.ɵmpd(1073742336, i1.AppModule, i1.AppModule, []),
      i0.ɵmpd(256, i0.ɵAPP_ROOT, true, [])
    ]
  );
});
exports.AppModuleNgFactory = AppModuleNgFactory;
//# sourceMappingURL=app.module.ngfactory.js.map
````

app.component.ngfactory.js
````javascript
"use strict";
/**
 * @fileoverview This file was generated by the Angular template compiler. Do not edit.
 *
 * @suppress {suspiciousCode,uselessCode,missingProperties,missingOverride,checkTypes}
 * tslint:disable
 */
Object.defineProperty(exports, "__esModule", {value: true});
var i0 = require("./app.component.scss.shim.ngstyle");
var i1 = require("@angular/core");
var i2 = require("./app.component");
var i3 = require("./emoji.service");
var styles_AppComponent = [i0.styles];
var RenderType_AppComponent = i1.ɵcrt({encapsulation: 0, styles: styles_AppComponent, data: {}});
exports.RenderType_AppComponent = RenderType_AppComponent;

function View_AppComponent_0(_l) {
  return i1.ɵvid(0, 
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Hi, ", " !! ", " end"]))
    ], 
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
    }
  );
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0, 
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [i3.EmojiService], null, null)
    ], 
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;
var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

### Styles
- Add style to app.component.scss

````scss
h1 {
  color: red;
}
````

- Run compiler, then check app.component.scss.shim.ngstyle.js

```javascript
Object.defineProperty(exports, "__esModule", { value: true });
var styles = ["h1[_ngcontent-%COMP%] {\n  color: red;\n}"];
exports.styles = styles;
//# sourceMappingURL=app.component.scss.shim.ngstyle.js.map
```

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
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title;
      var currVal_1 = _co.subtitle;
      _ck(_v, 1, 0, currVal_0, currVal_1);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````

## Experiment

- Note you must serve the app before changing main.ts else get an error:
ERROR in Tried to find bootstrap code, but could not. Specify either statically analyzable bootstrap code or pass in an entryModule to the plugins options.

```bash
ng serve
```

- Change main.ts

````typescript
import { AppModuleNgFactory } from '../dist/out-tsc/src/app/app.module.ngfactory';
...
platformBrowserDynamic().bootstrapModuleFactory(AppModuleNgFactory);
````

### Make title uppercase
- Modify app.component.ngfactory.js
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
      (_l()(), i1.ɵted(1, null, ["Angular Compiler Hi ", " ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.title.toUpperCase();
      var currVal_1 = _co.subtitle.toUpperCase();
      _ck(_v, 1, 0, currVal_0, currVal_1);
    });
}

exports.View_AppComponent_0 = View_AppComponent_0;

function View_AppComponent_Host_0(_l) {
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "app-root", [], null, null, null, View_AppComponent_0, RenderType_AppComponent)),
      i1.ɵdid(1, 49152, null, 0, i2.AppComponent, [], null, null)
    ],
    null, null);
}

exports.View_AppComponent_Host_0 = View_AppComponent_Host_0;

var AppComponentNgFactory = i1.ɵccf("app-root", i2.AppComponent, View_AppComponent_Host_0, {}, {}, []);
exports.AppComponentNgFactory = AppComponentNgFactory;
//# sourceMappingURL=app.component.ngfactory.js.map
````
