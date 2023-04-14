import { Component, OnInit } from '@angular/core';
import {MyModel} from './model/MyModel';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {

  title = 'This Component has an external template';
  myObject: MyModel;
  myArray: MyModel[] = [];

  constructor() { }

  ngOnInit() {
    this.myObject = new MyModel('Initial value');
    this.myArray.push(this.myObject);
  }
}
