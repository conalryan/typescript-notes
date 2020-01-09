import {ChangeDetectorRef, Component, ElementRef} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private _hostElement: ElementRef, private _cd: ChangeDetectorRef) {
    console.warn('App constructor(ElementRef, ChangeDetectorRef) { }');
    console.log(_hostElement);
    console.log(_cd);

    /*
    ElementRef {nativeElement: app-root}
    ViewRef_ {
      context: AppComponent {
        title: "app"
        _cd: ViewRef_ {_view: {…}, _viewContainerRef: null, _appRef: null}
        _hostElement: ElementRef {nativeElement: app-root}
        __proto__: Object
      }
      destroyed: false
      rootNodes: Array(2)
      _appRef: null
      _view: {def: {…}, parent: {…}, viewContainerParent: null, parentNodeDef: {…}, context: AppComponent, …}
      _viewContainerRef: null
      __proto__: Object
    }

    Note:
    - ViewRef_.context appears to be everything that was injected into the constructor.
     */
  }
}
