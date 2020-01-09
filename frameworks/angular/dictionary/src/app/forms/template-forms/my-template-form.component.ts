import {Component} from '@angular/core';
import {MyModel} from './model/my-model';
import {NgModel} from '@angular/forms';

@Component({
  selector: 'app-my-template-form',
  templateUrl: './my-template-form.component.html',
  styleUrls: ['./my-template-form.component.scss']
})
export class MyTemplateFormComponent {

  items = ['Something', 'Another', 'Maybe', 'Sold out'];
  model = new MyModel(18, 'Dr IQ', this.items[0]);
  submitted = false;

  constructor() {
  }

  onSubmit() {
    this.submitted = true;
  }

  newModel() {
    this.model = new MyModel(42, '', '');
  }

  get diagnostic() {
    return JSON.stringify(this.model);
  }
}
