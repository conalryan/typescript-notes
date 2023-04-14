import {Component, OnChanges, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MyModel} from './model/my-model';

@Component({
  selector: 'app-my-simple-form',
  templateUrl: './my-simple-form.component.html',
  styleUrls: ['./my-simple-form.component.scss']
})
export class MySimpleFormComponent implements OnInit, OnChanges {

  myModel = new MyModel(2, 'John', 'Doe', null, '1955-12-31');

  myForm: FormGroup;

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
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      alias: [''],
      dateOfBirth: ['', []]
    });
  }

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
      dateOfBirth: this.myModel.dateOfBirth
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
