import {
  AfterContentChecked, AfterContentInit, AfterViewChecked, AfterViewInit, ChangeDetectionStrategy, Component, DoCheck,
  Input, OnChanges,
  OnDestroy, OnInit,
  SimpleChanges
} from '@angular/core';
import {MyModel} from '../model/my-model';

@Component({
  selector: 'app-my-simple-changes',
  templateUrl: './my-simple-changes.component.html',
  styleUrls: ['./my-simple-changes.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MySimpleChangesComponent implements OnChanges, OnInit, DoCheck, AfterContentInit, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy {

  @Input() myNumberInput: number;
  @Input() myObjectInput: { key: string, value: number };
  @Input() myModelInput: MyModel;

  constructor() {
    console.warn('(2) Child constructor() { myNumberInput, myObjectInput } ');
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }

  /**
   * OnChanges()
   * https://angular.io/api/core/OnChanges
   * - Respond when Angular (re)sets data-bound input properties.
   * - Receives a {@link SimpleChanges} object of current and previous property values.
   * - Called before ngOnInit() and whenever one or more data-bound input properties change.
   * - Called right after the data-bound properties have been checked and before view and content children are checked
   *   if at least one of them has changed.
   * - The `changes` parameter contains the changed properties.
   *
   * '''typescript
   * interface OnChanges {
   *   ngOnChanges(changes: SimpleChanges): void
   * }
   * ```
   *
   * ```typescript
   * export interface SimpleChanges {
   *   [propName: string]: SimpleChange;
   * }
   * ```
   *
   * ```typescript
   * export declare class SimpleChange {
   *   previousValue: any;
   *   currentValue: any;
   *   firstChange: boolean;
   *
   *   constructor(previousValue: any, currentValue: any, firstChange: boolean);
   *   isFirstChange(): boolean;
   * }
   * ```
   */
  ngOnChanges(changes: SimpleChanges) {
    // changes.prop contains the old and the new value...
    console.warn('(7) Child ngOnChanges(changes: SimpleChanges) { SimpleChanges, myNumberInput, myObjectInput } ');
    console.log(changes);
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }

  ngOnInit(): void {
    console.warn('(8) Child ngOnInit() { myNumberInput, myObjectInput } ');
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }

  ngDoCheck(): void {
    console.warn('(9) Child ngDoCheck() { myNumberInput, myObjectInput } ');
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }

  ngAfterContentInit(): void {
    console.warn('(10) Child ngAfterContentInit() { myNumberInput, myObjectInput } ');
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }

  ngAfterContentChecked(): void {
    console.warn('(11) Child ngAfterContentChecked() { myNumberInput, myObjectInput } ');
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }

  ngAfterViewInit(): void {
    console.warn('(12) Child ngAfterViewInit() { myNumberInput, myObjectInput } ');
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }

  ngAfterViewChecked(): void {
    console.warn('(13) Child ngAfterViewChecked() { myNumberInput, myObjectInput } ');
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }

  ngOnDestroy(): void {
    console.warn('Child ngOnDestroy() { myNumberInput, myObjectInput } ');
    console.log(this.myNumberInput);
    console.log(this.myObjectInput);
  }
}
