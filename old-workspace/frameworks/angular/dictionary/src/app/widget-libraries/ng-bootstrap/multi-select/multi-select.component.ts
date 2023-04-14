import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnChanges, OnDestroy,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {ResultTemplateContext} from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap/typeahead/typeahead-window';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-multi-select',
  template: `
    <div class="col form-control" id="multi-select-container">
      <span class="btn btn-primary btn-sm selected" *ngFor="let item of selectedItems">
        {{item}}<span class="close-selected" (click)="close(item)">&nbsp;x</span>
      </span>
      <input #input
             type="text"
             class="multi-select-input"
             id="multi-select-input"
             [appMultiSelect]="searchFn"
             #appMultiSelect="appMultiSelect"
             (keydown.enter)="click$.next($event.target.value)"
             (click)="click$.next($event.target.value)"
             (selectItem)="selected($event)"
             [inputFormatter]="inputFormatterFn"
             [resultFormatter]="resultFormatterFn"
             [resultTemplate]="resultTemplate"
             placeholder="Select something..."/>
      <i class="fa fa-list" id="toggle-multi-select" aria-hidden="true" (click)="toggleMultiSelect($event)"></i>
    </div>
  `,
  styles: [`
    #multi-select-container {
      height: auto;
    }

    .multi-select-input {
      border: 0;
      outline: 0;
    }

    .selected {
      height: 100%;
      margin-right: 0.2rem;
    }

    .close-selected {
      margin-left: 0.3rem;
    }

    #toggle-multi-select {
      float: right;
      padding-top: 0.25rem;
    }
  `],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MultiSelectComponent implements OnChanges, OnDestroy {
  @Input() id: string;
  /**
   * Pass items to iterator over directly.
   * Alternatively, client can use searchFn and generate the list based on user input.
   */
  @Input() items: any[];
  /**
   * A function to transform the provided observable text into the array of results.  Note that the "this" argument
   * is undefined so you need to explicitly bind it to a desired "this" target.
   * Alternatively, client can pass iterable directly via 'items' input.
   */
  @Input() searchFn: (text: Observable<string>) => Observable<any[]>;
  /**
   * A function to convert a given value into string to display in the input field
   */
  @Input() inputFormatterFn: (value: any) => string;
  /**
   * A function to format a given result before display. This function should return a formatted string without any
   * HTML markup
   */
  @Input() resultFormatterFn: (value: any) => string;
  /**
   * A template to override a matching result default display
   */
  @Input() resultTemplate: TemplateRef<ResultTemplateContext>;

  // Views
  @ViewChild('input') inputEl;
  @ViewChild('appMultiSelect') appMultiSelect: NgbTypeahead;

  // Model
  public model: any;
  selectedItems = [];
  private _filtered = [];
  /**
   * Used to open the list on focus.
   */
  focus$ = new Subject<string>();
  /**
   * Used to open the list on click of input.
   */
  click$ = new Subject<string>();

  constructor() {}

  ngOnChanges() {
    this.items = this.items || [];
    this._filtered = this.items;
    this.searchFn = this.searchFn || this.defaultSearch;
  }

  ngOnDestroy() {
    this.focus$.next();
    this.focus$.complete();
    this.click$.next();
    this.click$.complete();
  }

  defaultSearch = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clickWhenPopupClosed = this.click$.pipe(filter(() => !this.appMultiSelect.isPopupOpen()));
    return merge(debouncedText$, this.focus$, clickWhenPopupClosed).pipe(
      map(term => {
        this._filtered = this.items.filter(item => !this.selectedItems.includes(item));
        if (term) {
          this._filtered = this._filtered.filter(item => item.toLowerCase().indexOf(term.toLowerCase()) > -1);
        }
        return this._filtered;
      })
    );
  };

  selected($e) {
    $e.preventDefault();
    this.selectedItems.push($e.item);
    this.inputEl.nativeElement.value = '';
    this._filtered.splice(this._filtered.indexOf($e.item), 1);
  }

  close(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.inputEl.nativeElement.focus();
  }

  toggleMultiSelect($event): void {
    if (this.appMultiSelect.isPopupOpen()) {
      this.appMultiSelect.dismissPopup();
    } else {
      this.click$.next($event.target.value);
    }
    $event.preventDefault();
  }
}
