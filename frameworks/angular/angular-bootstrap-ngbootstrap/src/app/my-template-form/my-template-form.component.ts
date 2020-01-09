import {Component, OnInit} from '@angular/core';
import {MyModel} from './model/my-model';

@Component({
  selector: 'app-my-template-form',
  templateUrl: './my-template-form.component.html',
  styleUrls: ['./my-template-form.component.scss']
})
export class MyTemplateFormComponent implements OnInit {

  items = ['Something', 'Another', 'Maybe', 'Sold out'];

  model = new MyModel(18, 'Dr IQ', this.items[0]);

  submitted = false;

  onSubmit() {
    this.submitted = true;
  }

  // TODO: Remove this when we're done
  get diagnostic() {
    return JSON.stringify(this.model);
  }

  constructor() {
  }

  ngOnInit() {
  }

  newModel() {
    this.model = new MyModel(42, '', '');
  }
}
