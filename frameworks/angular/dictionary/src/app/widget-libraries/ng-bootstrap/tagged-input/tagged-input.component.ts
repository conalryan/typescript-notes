import {Component, ViewChild} from '@angular/core';
import { Observable } from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, map} from 'rxjs/operators';

const states = ['Alabama', 'Alaska', 'American Samoa', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'District Of Columbia', 'Federated States Of Micronesia', 'Florida', 'Georgia',
  'Guam', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine',
  'Marshall Islands', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
  'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'New York', 'North Carolina', 'North Dakota',
  'Northern Mariana Islands', 'Ohio', 'Oklahoma', 'Oregon', 'Palau', 'Pennsylvania', 'Puerto Rico', 'Rhode Island',
  'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virgin Islands', 'Virginia',
  'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'];

@Component({
  selector: 'app-tagged-input',
  templateUrl: './tagged-input.component.html',
  styleUrls: ['./tagged-input.component.scss']
})
export class TaggedInputComponent {

  @ViewChild('input') inputEl;
  selectedItems = [];

  search = (text$: Observable<string>) =>
    text$
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        map(term => {
          const matchRegExp = new RegExp(term, 'gi');
          return term.length === 0 ? [] : states.filter(v => {
            return this.selectedItems.indexOf(v) === -1 && matchRegExp.test(v);
          });
        })
      )

  selected($e) {
    $e.preventDefault();
    this.selectedItems.push($e.item);
    this.inputEl.nativeElement.value = '';
  }

  close(item) {
    this.selectedItems.splice(this.selectedItems.indexOf(item), 1);
    this.inputEl.nativeElement.focus();
  }

}
