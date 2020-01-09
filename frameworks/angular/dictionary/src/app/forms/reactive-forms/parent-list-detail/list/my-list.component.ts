import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MyEmployee} from '../model/MyParentListDetail';
import {FormArray} from '@angular/forms';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrls: ['./my-list.component.scss']
})
export class MyListComponent implements OnInit {

  @Input() employees: MyEmployee[];
  @Input() frmArray: FormArray;
  @Output() selected = new EventEmitter<MyEmployee>();

  constructor() { }

  ngOnInit() {
  }

  select(employee: MyEmployee) {
    console.log('[MyListComponent] select() { MyEmployee }');
    console.log(employee);
    this.selected.emit(employee);
  }
}
