# Simple Interpolation and Style Binding Stack Trace

app.component.html
````html
<h1 [style.color]="headerColor">Angular Change Detection {{interpolatedValue}}</h1>
<button type="button"
        class="btn btn-primary"
        id="counter-increment"
        (click)="incrementCounter()">
  Increment counter
</button>
<span>Counter is: {{counter}}</span>
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
  return i1.ɵvid(0,
    [
      (_l()(), i1.ɵeld(0, 0, null, null, 1, "h1", [], [[4, "color", null]], null, null, null, null)),
      (_l()(), i1.ɵted(1, null, ["Angular Change Detection ", ""])),
      (_l()(), i1.ɵeld(2, 0, null, null, 1, "button",
          [["class", "btn btn-primary"], ["id", "counter-increment"], ["type", "button"]], null, [[null, "click"]],
          function (_v, en, $event) {
            var ad = true;
            var _co = _v.component;
            if (("click" === en)) {
              var pd_0 = (_co.incrementCounter() !== false);
              ad = (pd_0 && ad);
            }
            return ad;
          },
          null, null)
      ),
      (_l()(), i1.ɵted(-1, null, [" Increment counter\n"])),
      (_l()(), i1.ɵeld(4, 0, null, null, 1, "span", [], null, null, null, null, null)),
      (_l()(), i1.ɵted(5, null, ["Counter is: ", ""]))
    ],
    null, function (_ck, _v) {
      var _co = _v.component;
      var currVal_0 = _co.headerColor;
      _ck(_v, 0, 0, currVal_0);
      
      var currVal_1 = _co.interpolatedValue;
      _ck(_v, 1, 0, currVal_1);
      
      var currVal_2 = _co.counter;
      _ck(_v, 5, 0, currVal_2);
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

elementDef
````javascript
export declare function elementDef(
  checkIndex: number, 
  flags: NodeFlags, 
  matchedQueriesDsl: null | [string | number, QueryValueType][], 
  ngContentIndex: null | number, 
  childCount: number, 
  namespaceAndName: string | null, 
  fixedAttrs?: null | [string, string][], 
  bindings?: null | [BindingFlags, string, string | SecurityContext | null][], 
  outputs?: null | ([string, string])[], 
  handleEvent?: null | ElementHandleEventFn, 
  componentView?: null | ViewDefinitionFactory, 
  componentRendererType?: RendererType2 | null): NodeDef;
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
- Second going through this function but now with AppComponent.
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
- Will be called to update element attributes, classes, styles, property.
- Ex. <h1 [style.color]="headerStyle">...
````javascript
function checkAndUpdateElementInline(view, def, v0, v1, v2, v3, v4, v5, v6, v7, v8, v9) {
  var bindLen = def.bindings.length;
  var changed = false;
  if (bindLen > 0 && checkAndUpdateElementValue(view, def, 0, v0))
    changed = true;
  if (bindLen > 1 && checkAndUpdateElementValue(view, def, 1, v1))
    changed = true;
  if (bindLen > 2 && checkAndUpdateElementValue(view, def, 2, v2))
    changed = true;
  if (bindLen > 3 && checkAndUpdateElementValue(view, def, 3, v3))
    changed = true;
  if (bindLen > 4 && checkAndUpdateElementValue(view, def, 4, v4))
    changed = true;
  if (bindLen > 5 && checkAndUpdateElementValue(view, def, 5, v5))
    changed = true;
  if (bindLen > 6 && checkAndUpdateElementValue(view, def, 6, v6))
    changed = true;
  if (bindLen > 7 && checkAndUpdateElementValue(view, def, 7, v7))
    changed = true;
  if (bindLen > 8 && checkAndUpdateElementValue(view, def, 8, v8))
    changed = true;
  if (bindLen > 9 && checkAndUpdateElementValue(view, def, 9, v9))
    changed = true;
  return changed;
}
````
````javascript
function checkAndUpdateElementValue(view, def, bindingIdx, value) {
  if (!checkAndUpdateBinding(view, def, bindingIdx, value)) {
    return false;
  }
  var binding = def.bindings[bindingIdx];
  var elData = asElementData(view, def.nodeIndex);
  var renderNode$$1 = elData.renderElement;
  var name = binding.name;
  switch (binding.flags & 15 /* Types */) {
    case 1 /* TypeElementAttribute */:
      setElementAttribute(view, binding, renderNode$$1, binding.ns, name, value);
      break;
    case 2 /* TypeElementClass */:
      setElementClass(view, renderNode$$1, name, value);
      break;
    case 4 /* TypeElementStyle */:
      setElementStyle(view, binding, renderNode$$1, name, value);
      break;
    case 8 /* TypeProperty */:
      var bindView = (def.flags & 33554432 /* ComponentView */ &&
          binding.flags & 32 /* SyntheticHostProperty */) ?
          elData.componentView :
          view;
      setElementProperty(bindView, binding, renderNode$$1, name, value);
      break;
  }
  return true;
}
````
````javascript
function setElementStyle(view, binding, renderNode$$1, name, value) {
  var renderValue = view.root.sanitizer.sanitize(SecurityContext.STYLE, value);
  if (renderValue != null) {
    renderValue = renderValue.toString();
    var unit = binding.suffix;
    if (unit != null) {
      renderValue = renderValue + unit;
    }
  }
  else {
    renderValue = null;
  }
  var renderer = view.renderer;
  if (renderValue != null) {
    renderer.setStyle(renderNode$$1, name, renderValue);
    // The style is now applied on the screen.
  }
  else {
    renderer.removeStyle(renderNode$$1, name);
  }
}
````
- After this function runs you will see the new style on the screen.
````javascript
DebugRenderer2.prototype.setStyle = function (el, style, value, flags) {
  var debugEl = getDebugNode(el);
  if (debugEl && debugEl instanceof DebugElement) {
    debugEl.styles[style] = value;
  }
  this.delegate.setStyle(el, style, value, flags);
  // The style is now displayed on the screen.
};
````

- Now we go back to the next iteration of the loop.
- Ex. first binding is for the style, second is for interpolation.
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
