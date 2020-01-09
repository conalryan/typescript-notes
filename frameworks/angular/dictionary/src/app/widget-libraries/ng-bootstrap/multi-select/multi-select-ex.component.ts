import { Component, OnInit } from '@angular/core';
import {Observable} from 'rxjs';
import {debounceTime, map} from 'rxjs/operators';

const NEW_ENGLAND: Array<{ name: string, flag: string }> = [
  {'name': 'Connecticut', 'flag': '9/96/Flag_of_Connecticut.svg/39px-Flag_of_Connecticut.svg.png'},
  {'name': 'Maine', 'flag': '3/35/Flag_of_Maine.svg/45px-Flag_of_Maine.svg.png'},
  {'name': 'Massachusetts', 'flag': 'f/f2/Flag_of_Massachusetts.svg/46px-Flag_of_Massachusetts.svg.png'},
  {'name': 'New Hampshire', 'flag': '2/28/Flag_of_New_Hampshire.svg/45px-Flag_of_New_Hampshire.svg.png'},
  {'name': 'Rhode Island', 'flag': 'f/f3/Flag_of_Rhode_Island.svg/32px-Flag_of_Rhode_Island.svg.png'},
  {'name': 'Vermont', 'flag': '4/49/Flag_of_Vermont.svg/46px-Flag_of_Vermont.svg.png'}
];

const inputFormatterLC = (result: string) => result.toLowerCase();
const resultFormatterUC = (result: string) => result.toUpperCase();

@Component({
  selector: 'app-multi-select-ex',
  template: `
    <ng-template #rt let-r="result" let-t="term">
      <img [src]="'https://upload.wikimedia.org/wikipedia/commons/thumb/' + r['flag']" class="mr-1" style="width: 16px">
      <ngb-highlight [result]="r.name" [term]="t"></ngb-highlight>
    </ng-template>
    <app-multi-select #appMultiSelect [searchFn]="searchFn" [inputFormatterFn]="inputFormatterFn" [resultTemplate]="rt"></app-multi-select>
  `,
  styles: []
})
export class MultiSelectExComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  searchFn = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      map(term => {
        console.log(term);
        return term === '' ? []
          : NEW_ENGLAND.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10)
      })
    );

  inputFormatterFn = (x: { name: string }) => x.name;


}
