import {Component, OnChanges, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyStates} from './model/my-states';
import {MyModel} from './model/my-model';
import {MyAddress} from './model/my-address';

@Component({
  selector: 'app-my-reactive-form',
  templateUrl: './my-reactive-form.component.html',
  styleUrls: ['./my-reactive-form.component.scss']
})
export class MyReactiveFormComponent implements OnChanges {

  states = MyStates;
  myForm: FormGroup;
  myModel = new MyModel(2, 'Dodo', 'D', new MyAddress(), ['800-123-4567']);

  /**
   * Option 1:
   * Create an individual FormControl
   * Bind to HTML [formControl]="myIndividualFC"
   * @type {FormControl}
   */
  myIndividualFC = new FormControl();

  /**
   * Option 2:
   * Create a FormGroup
   * Bind to HTML <form [FormGroup]="myFormGroup"...
   * Bind FormControl in HTML formControlName="myFormControl"
   * @type {FormGroup}
   */
  myFormGroup = new FormGroup({
    myFormControl: new FormControl()
  });

  /**
   * Option 3:
   * Use FormBuilder to create a FormGroup
   * Bind to HTML <form [FormGroup]="myFormGroup"...
   * Bind FormControl in HTML formControlName="myFormControl"
   *
   * Child FormGroup
   * Bind in HTML formGroupName="address"
   */
  createForm(): void {
    this.myForm = this._fb.group({
      name: ['', Validators.required],
      alias: '',
      address: this._fb.group({ // <-- the child FormGroup
        street: '',
        city: '',
        state: '',
        zip: ''
      }),
      phoneNumbers: this._fb.array([]) // <-- FormArray
    });
  }

  constructor(private _fb: FormBuilder) {
    this.createForm();

    // TODO remove this block, it's just to get data to display
    this.myForm.reset({
      name: this.myModel.name
    });
    this.setPhoneNumbers(this.myModel.phoneNumbers);

    this.onNameChange();
    this.onAliasChange();
  }

  ngOnChanges() {
    this.myForm.reset({
      name: this.myModel.name
    });
    this.setPhoneNumbers(this.myModel.phoneNumbers);
  }

  get phoneNumbers(): FormArray {
    return this.myForm.get('phoneNumbers') as FormArray;
  }

  setPhoneNumbers(phoneNumbers: string[]) {
    const phoneControls = phoneNumbers.map(phoneNumber => this._fb.control(phoneNumber));
    // FormArray should contain FormControls or FormGroups
    const phoneFormArray = this._fb.array(phoneControls);
    // set the control not the value. You're replacing the control not the value of the control.
    this.myForm.setControl('phoneNumbers', phoneFormArray);
  }

  addPhoneNumber() {
    this.phoneNumbers.push(this._fb.control(''));
  }

  onNameChange() {
    const nameFc = this.myForm.controls.name;
    nameFc.valueChanges.subscribe((name: string) => {
      const aliasFc = this.myForm.controls.alias;
      this.myForm.patchValue({
        alias: nameFc.value.substring(0, 1)
      });
    });
  }

  onAliasChange() {
    const aliasFc = this.myForm.controls.alias;
    aliasFc.valueChanges.subscribe((name: string) => {
      this.myForm.patchValue({
        name: aliasFc.value + ' updated'
      });
    });
  }
}
