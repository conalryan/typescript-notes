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
  selector: "app-child-b",
  template: `
  <p>
    child-b works!
  </p>
  `
})
export class ChildBComponent
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
    console.warn("B constructor() { ChangeDetectorRef }");
    console.log(_cd);
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.warn("B ngOnChanges(changes: SimpleChanges) { } ");
    console.log(changes);
  }

  ngOnInit() {
    console.warn("B ngOnInit() { } ");
  }

  ngDoCheck(): void {
    console.warn("B ngDoCheck() { } ");
  }

  ngAfterContentInit(): void {
    console.warn("B ngAfterContentInit() { } ");
  }

  ngAfterContentChecked(): void {
    console.warn("B ngAfterContentChecked() { } ");
  }

  ngAfterViewInit(): void {
    console.warn("B ngAfterViewInit() { } ");
  }

  ngAfterViewChecked(): void {
    console.warn("B ngAfterViewChecked() { } ");
  }
}
