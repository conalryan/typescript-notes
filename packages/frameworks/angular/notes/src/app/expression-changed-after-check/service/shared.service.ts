import {Injectable} from '@angular/core';

@Injectable()
export class SharedService {

  // Shared
  private _sharedProplisteners: Array<(value: any) => void>;
  private _sharedProp: any;

  // Parent to Child
  private _parentToChildPropListeners: Array<(value: any) => void>
  private _parentToChildProp: any;

  // Child to Parent
  private childToParentPropListeners: Array<(value: any) => void>
  private _childToParentProp: any


  // Shared
  set sharedProp(value: any) {
    this._sharedProp = value;
    this._sharedProplisteners.forEach((fn) => {
      fn(value);
    });
  }

  onSharedPropChange(fn: (value: any) => void) {
    this._sharedProplisteners.push(fn);
  }

  // Parent to child
  set parentToChildProp(value: any) {
    this._parentToChildProp = value;
    this._parentToChildPropListeners.forEach(fn => {
      fn(value);
    });
  }

  onParentToChildPropChange(fn: (value: any) => void) {
    this._parentToChildPropListeners.push(fn);
  }

  // Child to parent
  set childToParentProp(value: any) {
    this._childToParentProp = value;
    this.childToParentPropListeners.forEach(fn => {
      fn(value);
    });
  }

  onChildToParentPropChange(fn: (value: any) => void) {
    this.childToParentPropListeners.push(fn);
  }
}
