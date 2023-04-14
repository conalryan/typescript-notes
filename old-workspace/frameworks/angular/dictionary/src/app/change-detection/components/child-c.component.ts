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
  selector: "app-child-c",
  template: `
  <p>
    child-c works!
  </p>
  `
})
export class ChildCComponent
  implements
    OnChanges,
    OnInit,
    DoCheck,
    AfterContentInit,
    AfterContentChecked,
    AfterViewInit,
    AfterViewChecked {
  @Input()
  primitive: number;
  @Input()
  objProp: Model;

  constructor(private _cd: ChangeDetectorRef) {
    console.warn("C constructor() { ChangeDetectorRef }");
    console.log(_cd);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn("C ngOnChanges(changes: SimpleChanges) { } ");
    console.log(changes);
  }

  ngOnInit() {
    console.warn("C ngOnInit() { } ");
  }

  ngDoCheck(): void {
    console.warn("C ngDoCheck() { } ");
  }

  ngAfterContentInit(): void {
    console.warn("C ngAfterContentInit() { } ");
  }

  ngAfterContentChecked(): void {
    console.warn("C ngAfterContentChecked() { } ");
  }

  ngAfterViewInit(): void {
    console.warn("C ngAfterViewInit() { } ");
  }

  ngAfterViewChecked(): void {
    console.warn("C ngAfterViewChecked() { } ");
  }
}
