import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  DoCheck,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges
} from "@angular/core";
import { Model } from "../model/model";

@Component({
  selector: "app-child-a",
  template: `
  <p>
    child-a works!
  </p>
  `
})
export class ChildAComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  @Input()
  primitive: number = 0;
  @Input()
  objProp: Model = new Model('default');

  constructor(private _cd: ChangeDetectorRef) {
    console.warn("A constructor() { ChangeDetectorRef }");
    console.log(_cd);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn("A ngOnChanges(changes: SimpleChanges) { } ");
    console.log(changes);
  }

  ngOnInit() {
    console.warn("A ngOnInit() { } ");
  }

  ngDoCheck(): void {
    console.warn("A ngDoCheck() { } ");
  }

  ngAfterContentInit(): void {
    console.warn("A ngAfterContentInit() { } ");
  }

  ngAfterContentChecked(): void {
    console.warn("A ngAfterContentChecked() { } ");
  }

  ngAfterViewInit(): void {
    console.warn("A ngAfterViewInit() { } ");
  }

  ngAfterViewChecked(): void {
    console.warn("A ngAfterViewChecked() { } ");
  }
}
