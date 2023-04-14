import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MyModel} from './model/my-model';
import {MyStates} from './model/my-states';
import {MyAddress} from './model/my-address';

@Component({
  selector: 'app-my-compound-form',
  templateUrl: './my-compound-form.component.html',
  styleUrls: ['./my-compound-form.component.scss']
})
export class MyCompoundFormComponent implements OnInit, OnChanges {

  myModel = new MyModel(2, 'John', 'Doe', null, '1955-12-31', new MyAddress());
  states = MyStates;

  myForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.createForm();
    this.onFirstNameChange();
  }

  ngOnInit() {

  }

  ngOnChanges() {
    this.myForm.reset({
      firstName: this.myModel.firstName,
      lastName: this.myModel.lastName,
      alias: this.myModel.alias,
      dateOfBirth: this.myModel.dateOfBirth,
      address: this.myModel.address
    });
  }

  createForm(): void {
    this.myForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      alias: [''],
      dateOfBirth: ['', []],
      address: this._fb.group({ // <-- the child FormGroup
        street: '',
        city: '',
        state: '',
        zip: ''
      })
    });
  }

  onFirstNameChange() {
    const firstNameFc = this.myForm.controls.firstName;
    firstNameFc.valueChanges.subscribe((name: string) => {
      const aliasFc = this.myForm.controls.alias;
      this.myForm.patchValue({
        alias: firstNameFc.value.substring(0, 1)
      });
    });
  }
}
