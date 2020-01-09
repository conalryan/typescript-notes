import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {

  // Shared
  private _sharedProplisteners = [];
  private _sharedProp;

  // Parent to Child
  private _parentToChildPropListeners = [];
  private _parentToChildProp;

  // Child to Parent
  private childToParentPropListeners = [];
  private _childToParentProp;


  // Shared
  set sharedProp(value) {
    this._sharedProp = value;
    this._sharedProplisteners.forEach((fn) => {
      fn(value);
    });
  }

  onSharedPropChange(fn) {
    this._sharedProplisteners.push(fn);
  }

  // Parent to child
  set parentToChildProp(value) {
    this._parentToChildProp = value;
    this._parentToChildPropListeners.forEach(fn => {
      fn(value);
    });
  }

  onParentToChildPropChange(fn) {
    this._parentToChildPropListeners.push(fn);
  }

  // Child to parent
  set childToParentProp(value) {
    this._childToParentProp = value;
    this.childToParentPropListeners.forEach(fn => {
      fn(value);
    });
  }

  onChildToParentPropChange(fn) {
    this.childToParentPropListeners.push(fn);
  }
}
