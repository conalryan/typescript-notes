import { Component, OnInit } from '@angular/core';
import {Search} from '../model/search';

@Component({
  selector: 'app-template-form',
  templateUrl: './template-form.component.html',
  styleUrls: ['./template-form.component.scss']
})
export class TemplateFormComponent {

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
