import { Component, OnInit } from '@angular/core';
import {MyEmployee, MyParentListDetail} from '../model/MyParentListDetail';
import {MyAddress} from '../model/my-address';
import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';

// ========================================= Mocks ===============================================
const model = new MyParentListDetail();
model.companyId = 22;
model.companyName = 'Dis co.';

const a1 = new MyAddress();
a1.street = '123 Main St.';
a1.city = 'Whoville';
a1.state = 'XX';
a1.zip = '10101';

const e1 = new MyEmployee();
e1.id = 1;
e1.firstName = 'John';
e1.lastName = 'Doe';
e1.alias = 'Jo';
e1.addresses = [a1];
e1.phoneNumbers  = ['800-123-4567'];

const a2 = new MyAddress();
a2.street = '44 Other st.';
a2.city = 'Notville';
a2.state = 'XX';
a2.zip = '00011';

const e2 = new MyEmployee();
e2.id = 2;
e2.firstName = 'Jane';
e2.lastName = 'Doe';
e2.alias = 'Ja';
e2.addresses = [a2];
e2.phoneNumbers  = ['800-123-4567'];

model.employees = [e1].concat(e2);

@Component({
  selector: 'app-my-parent',
  templateUrl: './my-parent.component.html',
  styleUrls: ['./my-parent.component.scss']
})
export class MyParentComponent implements OnInit {

  myParent: MyParentListDetail;
  myParentFormGroup: FormGroup;

  constructor(private _fb: FormBuilder) {
    this.myParent = model;
    this.createForm();
    // Add mock data so we have something to play with.
    this.setEmployees(this.myParent.employees);
  }

  ngOnInit() {
  }

  createForm() {
    this.myParentFormGroup = this._fb.group({
      companyName: [this.myParent.companyName, [Validators.required]],
      employees: this._fb.array([])
    });
  }

  get employees(): FormArray {
    return this.myParentFormGroup.get('employees') as FormArray;
  }

  setEmployees(employees: MyEmployee[]) {
    const employeeFGs = employees.map(employee => this._fb.group(employee));
    // FormArray should contain FormControls or FormGroups
    const employeeFormArray = this._fb.array(employeeFGs);
    // set the control not the value. You're employeeFGs the control not the value of the control.
    this.myParentFormGroup.setControl('employees', employeeFormArray);
  }

  addEmployee() {
    this.employees.push(this._fb.control(''));
  }

  submit() {
    console.log('[MyParentComponent] submit() { myParentFormGroup }');
    console.log(this.myParentFormGroup);
  }
}
