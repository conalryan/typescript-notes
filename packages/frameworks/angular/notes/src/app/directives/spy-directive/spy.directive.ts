import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Directive,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit
} from "@angular/core";

/**
 * Spy on any element to which it is applied.
 * Usage: <div spy>...</div>
 */
@Directive({
  selector: "[appSpy]"
})
export class SpyDirective
  implements
    OnInit,
    OnChanges,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewChecked,
    AfterViewInit,
    OnDestroy {
  constructor() {
    console.log("[Spy] constructor() { } ");
  }

  ngOnInit() {
    console.log("[Spy] ngOnInit() { } ");
  }

  ngOnChanges() {
    console.log("[Spy] ngOnChanges() { } ");
  }

  ngDoCheck() {
    console.log("[Spy] ngDoCheck() { } ");
  }

  ngAfterContentInit() {
    console.log("[Spy] AfterContentInit() { } ");
  }

  ngAfterContentChecked() {
    console.log("[Spy] AfterContentChecked() { } ");
  }

  ngAfterViewInit() {
    console.log("[Spy] AfterViewInit() { } ");
  }

  ngAfterViewChecked() {
    console.log("[Spy] AfterViewChecked() { } ");
  }

  ngOnDestroy() {
    console.log("[Spy] ngOnDestroy() { } ");
  }
}
