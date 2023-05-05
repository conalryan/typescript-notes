import {Component, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyModel} from './model/my-model';
import {MyStates} from './model/my-states';
import {MyAddress} from './model/my-address';

@Component({
  selector: 'app-my-form-array',
  templateUrl: './my-form-array.component.html',
  styleUrls: ['./my-form-array.component.scss']
})
export class MyFormArrayComponent implements OnInit, OnChanges {

  myModel = new MyModel(2, 'John', 'Doe', '', '1955-12-31', new MyAddress(), ['800-123-4567', '800-123-4567']);
  states = MyStates;

  myForm: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.createForm();
    this.setPhoneNumbers(this.myModel.phoneNumbers);
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
    this.setPhoneNumbers(this.myModel.phoneNumbers);
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
      }),
      phoneNumbers: this._fb.array([]) // <-- FormArray
    });
  }

  onFirstNameChange() {
    const firstNameFc = this.myForm.controls['firstName'];
    firstNameFc.valueChanges.subscribe((name: string) => {
      const aliasFc = this.myForm.controls['alias'];
      this.myForm.patchValue({
        alias: firstNameFc.value.substring(0, 1)
      });
    });
  }

  get phoneNumbers(): FormArray {
    return this.myForm.get('phoneNumbers') as FormArray;
  }

  setPhoneNumbers(phoneNumbers: string[]) {
    const phoneControls = phoneNumbers.map(phoneNumber => this._fb.control(phoneNumber, [Validators.minLength(7)]));
    // FormArray should contain FormControls or FormGroups
    const phoneFormArray = this._fb.array(phoneControls);
    // set the control not the value. You're replacing the control not the value of the control.
    this.myForm.setControl('phoneNumbers', phoneFormArray);
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this._fb.control(''));
  }

  /**
   * Find index of FormControl parameter.
   *
   * @param {FormControl} phone
   */
  onPhoneClick(phone: FormControl) {
    console.log('[MyFormArrayComponent] onPhoneClick() { FormControl }');
    console.log(phone);
    const index = this.phoneNumbers.controls.indexOf(phone);
    console.log(index);
  }

}
