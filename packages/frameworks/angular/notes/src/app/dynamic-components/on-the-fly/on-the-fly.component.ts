import {
  AfterViewInit, Compiler,
  Component,
  ComponentRef,
  Injector,
  NgModule, NgModuleRef,
  OnDestroy,
  OnInit, ViewChild,
  ViewContainerRef
} from '@angular/core';

@Component({
  selector: 'app-on-the-fly',
  template: `
    <p>
      on-the-fly works!
      <ng-container #vc></ng-container>
    </p>
  `,
  styles: []
})
export class OnTheFlyComponent implements AfterViewInit, OnDestroy {

  @ViewChild('vc', {read: ViewContainerRef}) vc: ViewContainerRef;
  cmpRef: ComponentRef<any>;

  constructor(private _compiler: Compiler,
              private _injector: Injector,
              private _m: NgModuleRef<any>) {
  }

  ngAfterViewInit() {
    const template = '<span>I am {{name}}</span>';

    const tmpCmp = Component({template: template})(class {
    });
    const tmpModule = NgModule({declarations: [tmpCmp]})(class {
    });

    this._compiler.compileModuleAndAllComponentsAsync(tmpModule)
      .then((factories) => {
        const f = factories.componentFactories[0];
        this.cmpRef = f.create(this._injector, [], null, this._m);
        this.cmpRef.instance.name = 'B component';
        this.vc.insert(this.cmpRef.hostView);
      });
  }

  ngOnDestroy() {
    if (this.cmpRef) {
      this.cmpRef.destroy();
    }
  }
}
