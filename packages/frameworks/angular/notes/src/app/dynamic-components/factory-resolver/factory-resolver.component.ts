import {AfterViewInit, Component, ComponentFactoryResolver, OnInit, ViewChild, ViewContainerRef} from '@angular/core';
import {ChildComponent} from './child.component';

@Component({
  selector: 'app-factory-resolver',
  template: `
    <p>
      factory-resolver works!
    </p>
    <div #vc></div>
  `,
  styles: []
})
export class FactoryResolverComponent implements AfterViewInit {

  @ViewChild('vc', {read: ViewContainerRef}) _container: ViewContainerRef;

  constructor(private _resolver: ComponentFactoryResolver) {

  }

  ngAfterViewInit() {
    // Note: ChildComponent must be added to entryComponents else error is thrown:
    // ERROR Error: No component factory found for ChildComponent. Did you add it to @NgModule.entryComponents?
    const cmpFactory = this._resolver.resolveComponentFactory(ChildComponent);
    this._container.createComponent(cmpFactory);
  }

}
