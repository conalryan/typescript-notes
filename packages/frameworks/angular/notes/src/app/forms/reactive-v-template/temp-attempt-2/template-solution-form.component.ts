import { Component, OnInit } from '@angular/core';
import {Search} from '../model/search';

@Component({
  selector: 'app-template-solution-form',
  templateUrl: './template-solution-form.component.html',
  styleUrls: ['./template-solution-form.component.scss']
})
export class TemplateSolutionFormComponent {

   model: Search;

  constructor() {
    this.model = new Search();
  }

  newSearch() {
    this.model = new Search();
  }

  onSubmit() {
    alert(`\n
    Property: ${this.model.propertyCode}\n
    Check-in: ${this.model.checkIn}\n
    Nights: ${this.model.nights}\n
    Adults: ${this.model.adults}\n
    Children: ${this.model.children}`);
  }
}
