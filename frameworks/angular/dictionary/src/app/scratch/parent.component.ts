import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, Component, DoCheck, OnChanges,
  OnInit
} from '@angular/core';
import {AService} from './service/a.service';
import {InjectedOutOfContext} from './service/injected-out-of-context';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.scss']
})
export class ParentComponent implements OnInit, DoCheck, OnChanges, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked {

  parentNumber = 22;
  parentString = 'TwentyTwo';
  parentObj = {
    propNumber: 21,
    propString: 'Silva'
  };

  /**
   * CANNOT inject something that is NOT in the angular context (e.g. public injectedOutOfContext: InjectedOutOfContext)
   * else get error:
   *   core.js:1350 ERROR Error: Uncaught (in promise): Error: StaticInjectorError[InjectedOutOfContext]:
   *     StaticInjectorError[InjectedOutOfContext]:
   *       NullInjectorError: No provider for InjectedOutOfContext!
   */
  constructor(public aService: AService, /* public injectedOutOfContext: InjectedOutOfContext */) {
    console.log('[Parent] constructor() { AService, InjectedOutOfContext }');
    console.log(aService);
    //  console.log(injectedOutOfContext);
  }

  ngOnInit() {
    console.log('[Parent] ngOnInit() { AService, InjectedOutOfContext }');
    console.log(this.aService);
    //  console.log(this.injectedOutOfContext);
  }

  ngDoCheck() {
    console.log('[Parent] ngDoCheck() { }');
  }

  ngOnChanges() {
    console.log('[Parent] ngOnChanges() { }');
  }

  ngAfterContentInit() {
    console.log('[Parent] ngAfterContentInit() { }');
  }

  ngAfterContentChecked() {
    console.log('[Parent] ngAfterContentChecked() { }');
  }

  ngAfterViewInit() {
    console.log('[Parent] ngAfterViewInit() { }');
  }

  ngAfterViewChecked() {
    console.log('[Parent] ngAfterViewChecked() { }');
  }

  debug(something: any) {
    console.log(something);
    return something;
  }

  logIt() {
    console.log('logIt');
    console.log(this.parentNumber);
  }

  changeIt() {
    this.parentNumber += 1;
    console.log('changeit');
  }
}
