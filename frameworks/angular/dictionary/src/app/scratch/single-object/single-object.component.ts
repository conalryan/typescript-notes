import { Component, OnInit } from '@angular/core';
import {HasModels} from './model/has-models';
import {Person} from './model/person';

@Component({
  selector: 'app-single-object',
  template: `
    <p>
      single-object works!
    </p>
  `,
  styles: []
})
export class SingleObjectComponent implements OnInit {

  person: Person = {
    id: undefined,
    firstName: undefined,
    middleName: undefined,
    lastName: undefined
  };

  // hasModel: HasModels = {};

  constructor() { }

  ngOnInit() {
  }

}
