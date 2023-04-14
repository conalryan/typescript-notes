import {Component, ViewChild} from '@angular/core';
import {merge, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';
import {NgbTypeahead} from '@ng-bootstrap/ng-bootstrap';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-my-ngb-typeahead',
  template: `
    <label for="typeahead-basic">Search for a state:</label>
    <input type="text"
           class="form-control"
           id="typeahead-basic"
           [(ngModel)]="model"
           [ngbTypeahead]="searchFocus"
           (focus)="focus$.next($event.target.value)"
           (click)="click$.next($event.target.value)"
           [inputFormatter]="inputFormatter"
           [resultFormatter]="resultFormatter"
           #instance="ngbTypeahead"/>
    <hr/>
    <pre>Model: {{ model | json }}</pre>
  `,
  styles: []
})
export class MyNgbTypeaheadComponent {

  public model: any;

  @ViewChild('instance') instance: NgbTypeahead;
  focus$ = new Subject<string>();
  click$ = new Subject<string>();

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
    )

  searchFocus = (text$: Observable<string>) => {
    const debouncedText$ = text$.pipe(debounceTime(200), distinctUntilChanged());
    const clickWhenPopupClosed = this.click$.pipe(filter(() => !this.instance.isPopupOpen()));

    return merge(debouncedText$, this.focus$, clickWhenPopupClosed).pipe(
      map(term => (term === '' ? states
        : states.filter(v => v.toLowerCase().indexOf(term.toLowerCase()) > -1)).slice(0, 10))
    );
  }

  inputFormatter = (result: string) => result.toLowerCase();
  resultFormatter = (result: string) => result.toUpperCase();

}
