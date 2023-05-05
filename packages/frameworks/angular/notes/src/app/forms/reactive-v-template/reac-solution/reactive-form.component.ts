import {Component, OnInit} from '@angular/core';
import {Search} from '../model/search';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AppValidators } from '../../../validators/AppValidators';

@Component({
  selector: 'app-reactive-form',
  templateUrl: './reactive-form.component.html',
  styleUrls: ['./reactive-form.component.scss']
})
export class ReactiveFormComponent {

  model: Search;
  searchForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.model = new Search();
    this.createForm();
  }

  createForm() {
    this.searchForm = this._fb.group({
      propertyCode: ['', [
        Validators.required
      ]],
      checkIn: ['', [
        Validators.required
      ]],
      nights: ['', [
        Validators.required
      ]],
      adults: [1, [
        Validators.required,
        AppValidators.CustomMin(1),
        AppValidators.CustomMax(9)
      ]],
      children: [0, [
        Validators.required,
        AppValidators.CustomMin(0),
        AppValidators.CustomMax(9)
      ]],
      roomType: [''],
      quantity: [1]
    });
  }

  newSearch() {
    this.model = new Search();
  }

  onSubmit() {
    alert(`\n
    Property: ${this.searchForm.value.propertyCode}\n
    Check-in: ${this.searchForm.value.checkIn}\n
    Nights: ${this.searchForm.value.nights}\n
    Adults: ${this.searchForm.value.adults}\n
    Children: ${this.searchForm.value.children}`);
  }
}
